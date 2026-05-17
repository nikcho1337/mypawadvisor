"""One-shot GSC report for mypawadvisor.com.

Pulls last 28 days of search performance, top pages/queries, and zero-click
queries. Mirrors the stackadvisor gsc_check.py.
"""

from __future__ import annotations

import datetime as dt
import sys
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

KEY_PATH = Path(r"C:\Users\jaarj\Downloads\gen-lang-client-0771771526-ae37892be619.json")
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


def make_service():
    creds = service_account.Credentials.from_service_account_file(
        str(KEY_PATH), scopes=SCOPES
    )
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def query(svc, site: str, start: str, end: str, dimensions: list[str], row_limit: int = 25):
    body = {"startDate": start, "endDate": end, "dimensions": dimensions, "rowLimit": row_limit}
    return svc.searchanalytics().query(siteUrl=site, body=body).execute()


def fmt_row(row: dict) -> str:
    keys = row.get("keys", [])
    label = " | ".join(keys) if keys else "(total)"
    return (
        f"{label[:70]:70s}  "
        f"clicks={int(row['clicks']):>5}  "
        f"impr={int(row['impressions']):>6}  "
        f"ctr={row['ctr']*100:5.2f}%  "
        f"pos={row['position']:5.2f}"
    )


def main() -> int:
    svc = make_service()

    sites = svc.sites().list().execute().get("siteEntry", [])
    target = next((s for s in sites if "mypawadvisor" in s["siteUrl"]), None)
    if not target:
        print("ERROR: mypawadvisor.com not on this service account.", file=sys.stderr)
        return 1
    site = target["siteUrl"]

    end = dt.date.today() - dt.timedelta(days=2)
    start = end - dt.timedelta(days=27)
    start_s, end_s = start.isoformat(), end.isoformat()

    print("=" * 96)
    print(f"Site:   {site}   Window: {start_s} -> {end_s} (last 28 days)")
    print("=" * 96)
    print()

    print("-" * 96)
    print("TOTALS")
    print("-" * 96)
    totals = query(svc, site, start_s, end_s, [], row_limit=1).get("rows", [])
    print(" ", fmt_row(totals[0]) if totals else "  (no impressions)")
    print()

    print("-" * 96)
    print("TOP 25 QUERIES")
    print("-" * 96)
    for r in query(svc, site, start_s, end_s, ["query"], 25).get("rows", []):
        print(" ", fmt_row(r))
    print()

    print("-" * 96)
    print("TOP 25 PAGES")
    print("-" * 96)
    for r in query(svc, site, start_s, end_s, ["page"], 25).get("rows", []):
        print(" ", fmt_row(r))
    print()

    print("-" * 96)
    print("BY COUNTRY (top 10)")
    print("-" * 96)
    for r in query(svc, site, start_s, end_s, ["country"], 10).get("rows", []):
        print(" ", fmt_row(r))
    print()

    print("-" * 96)
    print("BY DEVICE")
    print("-" * 96)
    for r in query(svc, site, start_s, end_s, ["device"], 10).get("rows", []):
        print(" ", fmt_row(r))
    print()

    print("-" * 96)
    print("HIGH-IMPRESSION / ZERO-CLICK QUERIES (>=3 impressions, 0 clicks)")
    print("-" * 96)
    zres = query(svc, site, start_s, end_s, ["query"], 200).get("rows", [])
    zc = sorted([r for r in zres if r["clicks"] == 0 and r["impressions"] >= 3],
                key=lambda r: r["impressions"], reverse=True)
    if not zc:
        print("  (none)")
    for r in zc[:30]:
        print(" ", fmt_row(r))
    print()

    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except HttpError as e:
        print(f"\nHTTP ERROR: {e}", file=sys.stderr)
        sys.exit(3)
