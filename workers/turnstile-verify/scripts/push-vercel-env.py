"""
Push NEXT_PUBLIC_TURNSTILE_SITE_KEY (per-site) and TURNSTILE_VERIFY_ENDPOINT
(shared) to every Vercel project listed in .cache/vercel_env_manifest.json.

Upserts: if the env var already exists in a project, it's PATCHed; otherwise
POSTed. Targets all three environments (production, preview, development).

After all env vars are set, optionally triggers a redeploy of each project's
most recent production deployment so the new vars take effect.

Usage:
    set VERCEL_TOKEN=...     (Windows)
    export VERCEL_TOKEN=...  (Mac/Linux)
    python scripts/push-vercel-env.py            # push env vars only
    python scripts/push-vercel-env.py --redeploy # also redeploy
"""

import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

TEAM_ID = "team_CBbQ0SknlRz0cQTkClwru1S3"
MANIFEST = os.path.join(os.path.dirname(__file__), "..", ".cache", "vercel_env_manifest.json")
TARGETS = ["production", "preview", "development"]
KEYS = ["NEXT_PUBLIC_TURNSTILE_SITE_KEY", "TURNSTILE_VERIFY_ENDPOINT"]


def api(token, method, path, body=None):
    url = f"https://api.vercel.com{path}"
    if "?" in url:
        url += f"&teamId={TEAM_ID}"
    else:
        url += f"?teamId={TEAM_ID}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
    )
    try:
        resp = urllib.request.urlopen(req)
        return resp.status, json.loads(resp.read().decode() or "null")
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode() or "null")


def list_env_vars(token, project_id):
    code, data = api(token, "GET", f"/v9/projects/{project_id}/env?decrypt=false")
    if code != 200:
        print(f"  ! list_env_vars failed {code}: {data}")
        return {}
    by_key = {}
    for env in data.get("envs", []):
        by_key.setdefault(env["key"], []).append(env)
    return by_key


def upsert_env(token, project_id, key, value):
    existing = list_env_vars(token, project_id).get(key, [])
    payload = {
        "key": key,
        "value": value,
        "type": "plain",
        "target": TARGETS,
    }
    if not existing:
        code, data = api(token, "POST", f"/v10/projects/{project_id}/env", payload)
        return "created", code, data
    # Update each existing entry (Vercel may store one per target combination)
    results = []
    for env in existing:
        env_id = env["id"]
        code, data = api(
            token,
            "PATCH",
            f"/v9/projects/{project_id}/env/{env_id}",
            {"value": value, "target": TARGETS, "type": "plain"},
        )
        results.append((code, data))
    return "updated", results[0][0], results[0][1]


def latest_production_deployment(token, project_id):
    code, data = api(
        token,
        "GET",
        f"/v6/deployments?projectId={project_id}&target=production&limit=1",
    )
    if code != 200:
        return None
    deps = data.get("deployments", [])
    return deps[0] if deps else None


def redeploy(token, project_id, project_name):
    dep = latest_production_deployment(token, project_id)
    if not dep:
        print(f"  ! no prior production deployment to redeploy")
        return
    code, data = api(
        token,
        "POST",
        "/v13/deployments",
        {
            "name": project_name,
            "deploymentId": dep["uid"],
            "target": "production",
            "meta": {"redeploy-reason": "turnstile-env-rollout"},
        },
    )
    if code in (200, 201):
        print(f"  -> redeploy queued: {data.get('url')}")
    else:
        print(f"  ! redeploy failed {code}: {data}")


def main():
    token = os.environ.get("VERCEL_TOKEN")
    if not token:
        sys.exit("ERROR: set VERCEL_TOKEN environment variable")

    do_redeploy = "--redeploy" in sys.argv

    with open(MANIFEST) as f:
        manifest = json.load(f)

    print(f"Pushing env vars to {len(manifest)} Vercel projects...")
    print()

    for m in manifest:
        proj = m["project"]
        pid = m["project_id"]
        print(f"[{proj}]  ({pid})  group=MD-{m['group']:02d}")
        for key in KEYS:
            value = m["env_vars"][key]
            action, code, _data = upsert_env(token, pid, key, value)
            mark = "OK " if code in (200, 201) else f"FAIL({code})"
            preview = value if len(value) < 30 else value[:27] + "..."
            print(f"  {mark} {action:8s} {key} = {preview}")
        if do_redeploy:
            redeploy(token, pid, proj)
        print()
        time.sleep(0.2)


if __name__ == "__main__":
    main()
