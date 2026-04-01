import frappe

def auto_login_demo():
    if not getattr(frappe.local, "request", None):
        return

    host = frappe.request.host or ""

    if "demo.netasys.com.tr" not in host:
        return

    if frappe.session.user != "Guest":
        return

    # Admin bypass - /login?admin=1 ile admin girişine izin ver
    if frappe.request.path == "/login" and frappe.request.args.get("admin"):
        return

    path = frappe.request.path
    skip_prefixes = ("/api/", "/assets/", "/files/", "/private/", "/socket.io")
    if any(path.startswith(p) for p in skip_prefixes):
        return

    demo_user = "demouser@netasys.com.tr"
    if not frappe.db.exists("User", demo_user):
        return

    try:
        frappe.local.login_manager.login_as(demo_user)
        frappe.local.response["type"] = "redirect"
        frappe.local.response["location"] = "/app"
    except Exception as e:
        frappe.log_error(f"Demo otomatik giriş hatası: {str(e)}", "Auto Login Demo")