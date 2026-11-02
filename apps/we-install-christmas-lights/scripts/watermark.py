"""Burns the We Install Christmas Lights mark into every photo and video in public/.

Safe to re-run: scripts/watermark-manifest.json records finished files by hash, so
only new or replaced media gets marked. Run it after adding media to public/images
or public/videos, then commit the changed files and the manifest:

    python scripts/watermark.py

Source photos in media/ are never touched. To re-mark a file, restore an unmarked
copy to public/ first, since marking cannot be undone in place.
"""
import hashlib, json, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(APP, "public")
MANIFEST = os.path.join(APP, "scripts", "watermark-manifest.json")
SKIP = {"logo.png", "logo-light.png"}
FONT = r"C:\Windows\Fonts\arialbd.ttf"
PHOTO = (".jpg", ".jpeg", ".png", ".webp")
VIDEO = (".mp4", ".webm", ".mov")

# Where the mark sits, as (x fraction, y fraction of the mark's centre, width fraction).
# Cards crop photos with object-cover, so it stays inside the area every crop keeps.
LANDSCAPE = (0.76, 0.76, 0.22)
PORTRAIT = (0.72, 0.70, 0.34)
OVERRIDES = {
    # Sits in the gap between the hero's phone link and the form.
    "images/landing/hero.jpg": (0.5, 0.72, 0.17),
    "images/og-default.jpg": (0.86, 0.86, 0.2),
    "videos/light-show-highlight-reel.mp4": (0.88, 0.86, 0.18),
}


def sha(path):
    h = hashlib.sha1()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def fit_font(text, width):
    size = 8
    while ImageFont.truetype(FONT, size + 1).getlength(text) <= width:
        size += 1
    return ImageFont.truetype(FONT, size)


def make_mark(width, opacity=0.86):
    """Bulb string from the logo, business name and domain, in white with a soft shadow."""
    width = max(int(width), 90)
    logo = Image.open(os.path.join(PUBLIC, "images", "logo.png")).convert("RGBA")
    bulbs = logo.crop((0, 37, logo.width, logo.height))
    bulbs = bulbs.crop(bulbs.getbbox())
    bw = int(width * 0.62)
    bulbs = bulbs.resize((bw, max(1, int(bulbs.height * bw / bulbs.width))), Image.LANCZOS)
    pad = max(4, width // 24)
    name, domain = "We Install Christmas Lights", "weinstallchristmaslights.ca"
    f1, f2 = fit_font(name, width), fit_font(domain, width * 0.86)
    h1, h2 = f1.getbbox(name)[3], f2.getbbox(domain)[3]
    gap = max(2, width // 60)
    height = pad + bulbs.height + gap + h1 + gap + h2 + pad
    W = width + 2 * pad
    ink = Image.new("RGBA", (W, height), (0, 0, 0, 0))
    ink.alpha_composite(bulbs, ((W - bw) // 2, pad))
    d = ImageDraw.Draw(ink)
    y = pad + bulbs.height + gap
    d.text((W / 2, y), name, font=f1, fill=(255, 255, 255, 255), anchor="ma")
    d.text((W / 2, y + h1 + gap), domain, font=f2, fill=(255, 255, 255, 235), anchor="ma")
    shadow = Image.new("RGBA", ink.size, (0, 0, 0, 0))
    shadow.putalpha(ink.getchannel("A").point(lambda a: int(a * 0.8)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(max(1.5, width / 90)))
    out = Image.alpha_composite(shadow, ink)
    out.putalpha(out.getchannel("A").point(lambda a: int(a * opacity)))
    return out


def placement(rel, w, h):
    rule = OVERRIDES.get(rel) or (PORTRAIT if h > w else LANDSCAPE)
    return rule


def clamp_xy(rule, w, h, mark):
    x = int(rule[0] * w - mark.width / 2)
    y = int(rule[1] * h - mark.height / 2)
    return min(max(0, x), w - mark.width), min(max(0, y), h - mark.height)


def mark_photo(path, rel):
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    rule = placement(rel, *im.size)
    mark = make_mark(im.width * rule[2])
    base = im.convert("RGBA")
    base.alpha_composite(mark, clamp_xy(rule, *im.size, mark))
    out = base.convert("RGB")
    if path.lower().endswith(".png"):
        out.save(path, optimize=True)
    elif path.lower().endswith(".webp"):
        out.save(path, quality=84)
    else:
        out.save(path, "JPEG", quality=84, optimize=True, progressive=True)


def mark_video(path, rel):
    import cv2
    import imageio_ffmpeg

    cap = cv2.VideoCapture(path)
    w, h = int(cap.get(3)), int(cap.get(4))
    cap.release()
    rule = placement(rel, w, h)
    mark = make_mark(w * rule[2])
    tmp_png = path + ".mark.png"
    tmp_mp4 = path + ".tmp.mp4"
    mark.save(tmp_png)
    x, y = clamp_xy(rule, w, h, mark)
    cmd = [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-hide_banner", "-loglevel", "error", "-i", path, "-i", tmp_png,
           "-filter_complex", f"[0:v][1:v]overlay={x}:{y},format=yuv420p[v]", "-map", "[v]", "-map", "0:a?",
           "-c:v", "libx264", "-profile:v", "main", "-preset", "medium", "-crf", "24", "-c:a", "copy", "-movflags", "+faststart", tmp_mp4]
    r = subprocess.run(cmd, capture_output=True, text=True)
    os.remove(tmp_png)
    if r.returncode != 0:
        if os.path.exists(tmp_mp4):
            os.remove(tmp_mp4)
        raise RuntimeError(r.stderr[-400:])
    os.replace(tmp_mp4, path)


def main():
    done = json.load(open(MANIFEST, encoding="utf8")) if os.path.exists(MANIFEST) else {}
    marked = skipped = 0
    for folder in ("images", "videos"):
        for dp, _, fn in os.walk(os.path.join(PUBLIC, folder)):
            for f in sorted(fn):
                low = f.lower()
                if f in SKIP or not low.endswith(PHOTO + VIDEO):
                    continue
                path = os.path.join(dp, f)
                rel = os.path.relpath(path, PUBLIC).replace(os.sep, "/")
                if done.get(rel) == sha(path):
                    skipped += 1
                    continue
                (mark_video if low.endswith(VIDEO) else mark_photo)(path, rel)
                done[rel] = sha(path)
                marked += 1
                if low.endswith(VIDEO):
                    print("video", rel, round(os.path.getsize(path) / 1e6, 1), "MB", flush=True)
    with open(MANIFEST, "w", encoding="utf8") as f:
        json.dump(dict(sorted(done.items())), f, indent=0)
        f.write("\n")
    print(f"marked {marked}, already done {skipped}")


if __name__ == "__main__":
    sys.exit(main())
