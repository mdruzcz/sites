"""Scrape Nelson Cabinetry for upgrade photos: B12 (replace too-wide RTA), tall pantry, and any missing accessories."""
import json, os, re, subprocess, shutil
from pathlib import Path
from urllib.request import Request, urlopen

BASE = "https://nelsoncabinetry.ca"
APP_DIR = Path(r"C:\Users\Matt\Documents\Claude\Projects\Website Building\sites\apps\forevercabinets")
IMG_DIR = APP_DIR / "public" / "images" / "cabinets"
JSON_PATH = APP_DIR / "src" / "content" / "cabinets.json"

# SKUs we want to upgrade or fill from Nelson
SKU_TO_URL = {
    # Replace too-wide RTA photo
    "B12": "/product/12-15-18-21-base-cabinet-single-door-single-drawer/",
    # Tall pantry (Nelson sells 30x90 — visually identical to our 24x90)
    "WP249024": "/product/30-x-90-pantry-utility-cabinet/",
    # Waste basket alternative
    "BWBK18": "/product/12-drawer-base-cabinet/",  # placeholder — Nelson doesn't list waste-basket explicitly here
}


def firecrawl_scrape_markdown(url):
    try:
        cmd = f'firecrawl scrape "{url}" --format markdown'
        result = subprocess.run(
            cmd, capture_output=True, text=True, timeout=90, encoding="utf-8", shell=True,
        )
        return result.stdout or ""
    except Exception as e:
        print(f"  firecrawl error: {e}")
        return ""


def extract_images(text):
    pat = re.compile(r"https://nelsonkb\.com/wp-content/uploads/[^\s\)\"']+\.(?:jpg|jpeg|png|webp)", re.I)
    raw = pat.findall(text)
    # Also accept nelsoncabinetry.ca CDN
    pat2 = re.compile(r"https://nelsoncabinetry\.ca/wp-content/uploads/[^\s\)\"']+\.(?:jpg|jpeg|png|webp)", re.I)
    raw += pat2.findall(text)
    SKIPLIST = [
        "logo", "icon", "favicon", "sidebar", "homesidebar", "designsidebar",
        "callsidebar", "shopping-cart", "lines.webp", "hamburger",
        "paypal", "visa", "mastercard", "amex", "stripe", "discover", "apple-pay",
        "google-pay", "afterpay", "shop-pay", "klarna", "diners",
        "social", "facebook", "instagram", "twitter", "pinterest", "youtube",
        "linkedin", "envelope", "phone-solid", "card-", "credit-card",
        "/asset-", "asset-1", "asset-2", "asset-3", "asset-4", "asset-5",
        "asset-6", "asset-7", "asset-8", "asset-9", "asset-0",
    ]
    seen, cleaned = set(), []
    for url in raw:
        low = url.lower()
        if any(x in low for x in SKIPLIST):
            continue
        full = re.sub(r"-\d+x\d+(?=\.[a-z]+$)", "", url)
        if full not in seen:
            seen.add(full)
            cleaned.append(full)
    return cleaned


def download(url, dest):
    if dest.exists():
        return True
    try:
        dest.parent.mkdir(parents=True, exist_ok=True)
        req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(req, timeout=20) as r, open(dest, "wb") as f:
            shutil.copyfileobj(r, f)
        return True
    except Exception as e:
        print(f"  download error for {url}: {e}")
        return False


def main():
    cabinets = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    sku_map = {c["sku"]: c for c in cabinets}

    for sku, path in SKU_TO_URL.items():
        url = BASE + path
        print(f"[{sku}] {url}")
        md = firecrawl_scrape_markdown(url)
        if not md:
            continue
        images = extract_images(md)
        print(f"  found {len(images)} image(s)")
        if not images:
            continue

        slug = sku_map[sku]["slug"]
        local_urls = []
        # Use 'nelson-' prefix to avoid clobbering existing RTA files
        for i, img_url in enumerate(images[:3]):
            ext = ".webp" if img_url.lower().endswith(".webp") else ".jpg"
            fname = f"nelson-{i+1}{ext}"
            dest = IMG_DIR / slug / fname
            if download(img_url, dest):
                local_urls.append(f"/images/cabinets/{slug}/{fname}")

        if local_urls:
            existing = sku_map[sku].get("image_urls", [])
            # For B12, replace the RTA images entirely (user said they look too wide)
            if sku == "B12":
                sku_map[sku]["image_urls"] = local_urls
            else:
                # Append for others (use as alternates)
                sku_map[sku]["image_urls"] = local_urls + existing

    JSON_PATH.write_text(json.dumps(cabinets, indent=2, ensure_ascii=False), encoding="utf-8")
    print("Done.")


if __name__ == "__main__":
    main()
