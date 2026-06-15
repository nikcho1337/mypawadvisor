"""One-shot script: add `alternates: { canonical: "/<path>" }` to every page
that doesn't already have it. Idempotent; safe to re-run.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

APP_DIR = Path(r"C:\Users\jaarj\pawsguide\app")


def add_canonical(path: Path, canonical_path: str) -> bool:
    src = path.read_text(encoding="utf-8")
    if "alternates:" in src:
        return False
    if "export const metadata" not in src:
        return False

    m = re.search(r"export const metadata\s*:\s*Metadata\s*=\s*\{", src)
    if not m:
        return False
    start = m.end()
    depth = 1
    i = start
    while i < len(src) and depth > 0:
        c = src[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                break
        i += 1
    if depth != 0:
        return False
    closing = i

    insertion = f'  alternates: {{ canonical: "{canonical_path}" }},\n'
    line_start = src.rfind("\n", 0, closing) + 1
    new_src = src[:line_start] + insertion + src[line_start:]

    path.write_text(new_src, encoding="utf-8")
    return True


# All routes to ensure have canonical. Blog posts discovered dynamically.
TOP_LEVEL = [
    ("page.tsx", "/"),
    ("reviews/page.tsx", "/reviews"),
    ("blog/page.tsx", "/blog"),
    ("insurance/page.tsx", "/insurance"),
    ("insurance/healthy-paws-review/page.tsx", "/insurance/healthy-paws-review"),
    ("insurance/embrace-review/page.tsx", "/insurance/embrace-review"),
    ("dogs/page.tsx", "/dogs"),
    ("cats/page.tsx", "/cats"),
    ("about/page.tsx", "/about"),
    ("privacy/page.tsx", "/privacy"),
]


def main() -> int:
    updated, skipped = 0, 0

    for rel, canon in TOP_LEVEL:
        page = APP_DIR / rel
        if not page.exists():
            print(f"  ? {canon}  (file missing — skipping)")
            continue
        if add_canonical(page, canon):
            print(f"  + {canon}")
            updated += 1
        else:
            print(f"  . {canon}  (already set or no metadata export)")
            skipped += 1

    for page in sorted((APP_DIR / "blog").glob("*/page.tsx")):
        slug = page.parent.name
        canon = f"/blog/{slug}"
        if add_canonical(page, canon):
            print(f"  + {canon}")
            updated += 1
        else:
            print(f"  . {canon}  (already set)")
            skipped += 1

    print(f"\nDone. Updated {updated}, skipped {skipped}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
