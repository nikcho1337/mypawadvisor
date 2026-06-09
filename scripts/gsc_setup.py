"""GSC setup audit for mypawadvisor.com.

Checks property verification, submitted sitemaps, indexing activity.
Mirrors the stackadvisor gsc_setup.py.
"""

from __future__ import annotations

import sys
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

KEY_PATH = Path(r"C:\Users\jaarj\Downloads\gen-lang-client-0771771526-ae37892be619.json")
SITE_URL = "sc-domain:mypawadvisor.com"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


def make_service():
    creds = service_account.Credentials.from_service_account_file(
        str(KEY_PATH), scopes=SCOPES
    )
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def main() -> int:
    svc = make_service()

    print("=" * 96)
    print("PROPERTY VERIFICATION")
    print("=" * 96)
    sites = svc.sites().list().execute().get("siteEntry", [])
    target = next((s for s in sites if "mypawadvisor" in s["siteUrl"]), None)
    if not target:
        print("  mypawadvisor.com NOT found on this service account.")
        return 1
    print(f"  URL:        {target['siteUrl']}")
    print(f"  Permission: {target['permissionLevel']}")
    print()

    print("=" * 96)
    print("SUBMITTED SITEMAPS")
    print("=" * 96)
    sitemaps = svc.sitemaps().list(siteUrl=SITE_URL).execute().get("sitemap", [])
    if not sitemaps:
        print("  NO SITEMAPS SUBMITTED.")
    for sm in sitemaps:
        print(f"  Path:           {sm.get('path')}")
        print(f"  Last submitted: {sm.get('lastSubmitted', '-')}")
        print(f"  Last downloaded:{sm.get('lastDownloaded', '-')}")
        print(f"  Pending:        {sm.get('isPending', False)}")
        for c in sm.get("contents", []):
            print(f"    type={c.get('type')}  submitted={c.get('submitted')}  indexed={c.get('indexed', '-')}")
        w, e = int(sm.get("warnings", 0)), int(sm.get("errors", 0))
        marker = "ERRORS" if e else ("WARNINGS" if w else "OK")
        print(f"  Status:         {marker}  warnings={w} errors={e}")
        print()

    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except HttpError as e:
        print(f"\nHTTP ERROR: {e}", file=sys.stderr)
        sys.exit(3)
