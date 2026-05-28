"""Scrape rtacabinetscanada.ca White Shaker collection.
Maps our SKUs to their product URLs, extracts the primary image, downloads to public/images/cabinets/[sku]/.
"""
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import unquote
from urllib.request import urlretrieve, Request, urlopen
import shutil

BASE = "https://rtacabinetscanada.ca"
APP_DIR = Path(r"C:\Users\Matt\Documents\Claude\Projects\Website Building\sites\apps\forevercabinets")
IMG_DIR = APP_DIR / "public" / "images" / "cabinets"
HERO_DIR = APP_DIR / "public" / "images" / "hero"
JSON_PATH = APP_DIR / "src" / "content" / "cabinets.json"

# Map our SKU → RTA product path (relative)
# Some SKUs share a source URL because RTA sells them as a "range" product
SKU_TO_URL = {
    # Base single door + drawer (9-21")
    "B09": "/product/white-shaker-9%e2%80%b3-base-cabinet-single-door-single-drawer",
    "B12": "/product/white-shaker-12%e2%80%b3-21%e2%80%b3-base-cabinet-single-door-single-drawer",
    "B15": "/product/white-shaker-15%e2%80%b3-base-cabinet-single-door-single-drawer",
    "B18": "/product/white-shaker-18%e2%80%b3-base-cabinet-single-door-single-drawer",
    "B21": "/product/white-shaker-21%e2%80%b3-base-cabinet-single-door-single-drawer",
    # Base double door + drawer (24-42")
    "B24": "/product/white-shaker-24%e2%80%b3-42%e2%80%b3-base-cabinet-double-door-single-drawer",
    "B27": "/product/white-shaker-27%e2%80%b3-base-cabinet-double-door-single-drawer",
    "B30": "/product/white-shaker-30%e2%80%b3-base-cabinet-double-door-single-drawer",
    "B33": "/product/white-shaker-33%e2%80%b3-base-cabinet-double-door-single-drawer",
    "B36": "/product/white-shaker-36%e2%80%b3-base-cabinet-double-door-single-drawer",
    # Drawer base (3 drawers)
    "DB12": "/product/white-shaker-12%e2%80%b3-36%e2%80%b3-three-drawer-base-cabinet",
    "DB15": "/product/white-shaker-15%e2%80%b3-three-drawer-base-cabinet",
    "DB18": "/product/white-shaker-18%e2%80%b3-three-drawer-base-cabinet",
    "DB21": "/product/white-shaker-21%e2%80%b3-three-drawer-base-cabinet",
    "DB24": "/product/white-shaker-24%e2%80%b3-three-drawer-base-cabinet",
    "DB30": "/product/white-shaker-30%e2%80%b3-three-drawer-base-cabinet",
    # Sink bases
    "SB33": "/product/white-shaker-sink-base-cabinet-33",
    "SB36": "/product/white-shaker-30-42%e2%80%b3-sink-base-cabinet",
    # Specialty bases
    "Lazy Susan 33": "/product/white-shaker-33%e2%80%b3-36%e2%80%b3-lazy-susan-corner-base-cabinet",
    "Lazy Susan 36": "/product/white-shaker-36%e2%80%b3-lazy-susan-corner-base-cabinet",
    "BBC42-45": "/product/white-shaker-45%e2%80%b3-blind-base-corner-cabinet",
    "BEC24": "/product/white-shaker-base-end-corner-cabinet-24",
    "BWBK18": "/product/roll-out-waste-basket-cabinet-18",
    # Wall cabinets (single door, 9-15")
    "W0936": "/product/white-shaker-09%e2%80%b3-wall-cabinet",
    "W1236": "/product/white-shaker-12%e2%80%b3-wall-cabinet",
    "W1536": "/product/white-shaker-15%e2%80%b3-wall-cabinet",
    "W1836": "/product/white-shaker-18%e2%80%b3-wall-cabinet",
    "W2136": "/product/white-shaker-21%e2%80%b3-wall-cabinet",
    "W2436": "/product/white-shaker-24%e2%80%b3-wall-cabinet",
    "W2736": "/product/white-shaker-27%e2%80%b3-wall-cabinet",
    "W3036": "/product/white-shaker-30%e2%80%b3-wall-cabinet",
    "W3018": "/product/white-shaker-wall-cabinet-30",
    # Glass wall
    "WGC1236": "/product/white-shaker-12%e2%80%b3-wall-cabinet-glass-door",
    "WGC1536": "/product/white-shaker-12%e2%80%b3-wall-cabinet-glass-door",
    "WGC1836": "/product/white-shaker-12%e2%80%b3-wall-cabinet-glass-door",
    # Diagonal corner wall
    "WDC2436": "/product/white-shaker-24%e2%80%b3-wall-diagonal-corner-cabinet",
    "WDCG243612": "/product/white-shaker-wall-diagonal-cabinet-glass-24",
    # Blind corner wall
    "WBC2736": "/product/white-shaker-27%e2%80%b3-w-wall-blind-corner-cabinet",
    # Over-fridge
    "W301824": "/product/white-shaker-30-36%e2%80%b3-refrigerator-wall-cabinet",
    "W361824": "/product/white-shaker-36%e2%80%b3-refrigerator-wall-cabinet",
    # Wine rack
    "WRC3018": "/product/white-shaker-24-30%e2%80%b3-wine-rack-cabinet",
    # Tall pantry
    "WP249024": "/product/white-shaker-24%e2%80%b3-pantry-utility-cabinet",
    # Microwave wall (no exact match — use 30" wall as placeholder)
    "WMC2736": "/product/white-shaker-27%e2%80%b3-wall-cabinet",
    # End cabinet (no exact match)
    "WEC1236": "/product/white-shaker-12%e2%80%b3-wall-cabinet",
}


def slugify(s):
    s = str(s).lower().strip()
    s = s.replace("½", "-half").replace("¼", "-qtr").replace("¾", "-3qtr").replace("–", "-").replace("×", "x")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


def firecrawl_scrape_markdown(url):
    try:
        # shell=True needed on Windows so .cmd shims (firecrawl) resolve
        cmd = f'firecrawl scrape "{url}" --format markdown'
        result = subprocess.run(
            cmd, capture_output=True, text=True, timeout=90, encoding="utf-8", shell=True,
        )
        return result.stdout or ""
    except Exception as e:
        print(f"  firecrawl error: {e}")
        return ""


def extract_product_images(markdown_text):
    """Extract product image URLs (excluding logos/icons/nav)."""
    pat = re.compile(r"https://rtacabinetscanada\.ca/wp-content/uploads/[^\s\)\"']+\.(?:jpg|jpeg|png|webp)", re.I)
    raw = pat.findall(markdown_text)
    seen = set()
    cleaned = []
    for url in raw:
        if any(x in url.lower() for x in ["logo", "icon", "favicon"]):
            continue
        # Prefer full-resolution version: strip -700x467 etc.
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
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    HERO_DIR.mkdir(parents=True, exist_ok=True)

    sku_images = {}      # sku → list[local-relative-url]
    url_to_images = {}   # cached, since multiple SKUs share URLs
    hero_candidates = []

    for sku, path in SKU_TO_URL.items():
        url = BASE + path
        print(f"[{sku}] {url}")

        if url in url_to_images:
            images = url_to_images[url]
            print(f"  cached: {len(images)} image(s)")
        else:
            md = firecrawl_scrape_markdown(url)
            if not md:
                url_to_images[url] = []
                continue
            images = extract_product_images(md)
            url_to_images[url] = images
            print(f"  found: {len(images)} image(s)")

        if not images:
            continue

        # Download up to 3 images per SKU (the main shot + alternates)
        local_urls = []
        sku_slug = slugify(sku)
        for i, img_url in enumerate(images[:3]):
            ext = ".webp" if img_url.lower().endswith(".webp") else ".jpg"
            fname = f"{i+1}{ext}"
            dest = IMG_DIR / sku_slug / fname
            if download(img_url, dest):
                local_urls.append(f"/images/cabinets/{sku_slug}/{fname}")

        if local_urls:
            sku_images[sku] = local_urls

        # Collect lifestyle-looking images as hero candidates
        # (RTA tends to put kitchen lifestyle shots after the product on each page)
        for img_url in images:
            # Lifestyle photos usually have larger aspect ratios in their dims
            if any(token in img_url.lower() for token in ["kitchen", "lifestyle", "1638x2048", "1536x1229", "1638x"]):
                hero_candidates.append(img_url)

    # Save hero candidates info
    print(f"\nDownloading hero candidates: {len(hero_candidates)} unique URLs")
    seen = set()
    for i, url in enumerate(hero_candidates[:5]):
        if url in seen: continue
        seen.add(url)
        ext = ".webp" if url.lower().endswith(".webp") else ".jpg"
        dest = HERO_DIR / f"candidate-{i+1}{ext}"
        if download(url, dest):
            print(f"  downloaded: {dest.name}")

    # Update cabinets.json with image_urls
    cabinets = json.load(open(JSON_PATH, encoding="utf-8"))
    matched = 0
    for c in cabinets:
        if c["sku"] in sku_images:
            c["image_urls"] = sku_images[c["sku"]]
            matched += 1
    json.dump(cabinets, open(JSON_PATH, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    print(f"\nMatched images for {matched} / {len(cabinets)} SKUs")


if __name__ == "__main__":
    main()
