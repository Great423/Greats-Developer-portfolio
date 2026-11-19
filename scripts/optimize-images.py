#!/usr/bin/env python3
"""
Generates the responsive image variants the site serves.

For every source image below it writes AVIF and WebP copies at each listed
width, next to the original, named `<name>-<width>.<ext>`. The originals stay
in place as the final fallback. src/lib/images.js describes the same widths, so
keep the two in step when adding an image.

Requires Pillow with AVIF support (Pillow 11.2 or newer):

    python3 -m pip install --upgrade pillow
    python3 scripts/optimize-images.py
"""
from pathlib import Path

from PIL import Image

PUBLIC = Path(__file__).resolve().parent.parent / "public"

# Path under public/ -> widths to produce. Widths never exceed the source.
SOURCES = {
    "assets/about2.png": [360, 560, 840, 1126],
    "assets/working.jpg": [480, 720, 1080],
    "projects/fuelup-global.jpg": [480, 768, 1200, 1600],
    "projects/viraleety.jpg": [480, 768, 1200, 1600],
    "projects/radio-church.jpg": [480, 768, 1200, 1600],
    "projects/crudpen.jpg": [480, 768, 1200, 1600],
    "projects/grandlife.jpg": [480, 768, 1200, 1600],
    "projects/fhapi.jpg": [480, 768, 1200, 1600],
}

# Screenshots carry small text, so quality stays a little above the usual
# photo settings.
AVIF = {"quality": 58, "speed": 4}
WEBP = {"quality": 78, "method": 6}


def main() -> None:
    total_before = total_after = 0
    for relative, widths in SOURCES.items():
        source = PUBLIC / relative
        image = Image.open(source)
        image = image.convert("RGBA" if "transparency" in image.info or image.mode in ("RGBA", "LA", "P") else "RGB")
        if image.mode == "RGBA" and image.getextrema()[3] == (255, 255):
            image = image.convert("RGB")  # fully opaque: drop the unused alpha channel

        for width in widths:
            width = min(width, image.width)
            height = round(image.height * width / image.width)
            resized = image if width == image.width else image.resize((width, height), Image.LANCZOS)
            for ext, options in (("avif", AVIF), ("webp", WEBP)):
                target = source.with_name(f"{source.stem}-{width}.{ext}")
                resized.save(target, ext.upper(), **options)
                total_after += target.stat().st_size if ext == "avif" else 0
        total_before += source.stat().st_size
        print(f"{relative}: {', '.join(str(w) for w in widths)}")
    print(f"originals {total_before / 1024:.0f} KB, largest AVIF set {total_after / 1024:.0f} KB")


if __name__ == "__main__":
    main()
