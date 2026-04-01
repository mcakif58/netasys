import frappe

FAVICON_URL = "/assets/netasys/images/neta_favicon_dark.svg"


def boot_session(bootinfo):
    """
    Frappe boot oturumunda ERPNext / Frappe başlıklarını
    Netasys ile değiştir.  Her sayfa yüklemesinde otomatik çalışır.
    """

    # ── 1. app_data içindeki başlıkları değiştir ──────────────────────
    TITLE_MAP = {
        "ERPNext": "Netasys",
        "Frappe Framework": "Netasys",
    }

    for app in bootinfo.get("app_data") or []:
        old_title = app.get("app_title")
        if old_title in TITLE_MAP:
            app["app_title"] = TITLE_MAP[old_title]

    # ── 2. Navbar / ana logo URL ──────────────────────────────────────
    bootinfo["app_logo_url"] = "/assets/netasys/images/neta_light.png"




