import frappe

def after_install():
    # Sistemin genelinde onboarding'i devre dışı bırakır
    frappe.db.set_single_value("System Settings", "enable_onboarding", 0)

    frappe.db.commit()
