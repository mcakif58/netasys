import frappe

def after_install():
    # 1. System Settings
    frappe.db.set_single_value("System Settings", "app_name", "Netasys")
    frappe.db.set_single_value("System Settings", "enable_onboarding", 0)

    # 2. Website Settings — title önemli, sekme başlığını belirler
    frappe.db.set_single_value("Website Settings", "title", "Netasys")
    frappe.db.set_single_value("Website Settings", "app_logo",
                               "/assets/netasys/images/neta_light.png")
    frappe.db.set_single_value("Website Settings", "splash_screen_logo",
                               "/assets/netasys/images/neta_light.png")
    frappe.db.set_single_value("Website Settings", "favicon",
                               "/assets/netasys/images/neta_favicon_dark.svg")

    # 3. Navbar Settings
    frappe.db.set_single_value("Navbar Settings", "app_logo",
                               "/assets/netasys/images/neta_light.png")

    frappe.db.commit()
    frappe.clear_cache()
