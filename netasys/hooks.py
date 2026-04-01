app_name = "netasys"
app_title = "Netasys"
app_publisher = "netasys"
app_description = "KOBİler için ERP ve MES çözümü"
app_email = "info@netasys.com.tr"
app_license = "custom"

brand_html = """<img id="neta-logo" src="/assets/netasys/images/neta_dark.png" style="height:30px">"""
app_logo_url = "/assets/netasys/images/neta_light.png"

app_include_js = ["/assets/netasys/js/brand_override.js"]
app_include_css = ["/assets/netasys/css/netasys.css"]

# Website sayfaları (login, portal) için favicon
website_context = {
    "favicon": "/assets/netasys/images/neta_favicon_dark.svg",
    "splash_image": "/assets/netasys/images/neta_light.png",
}

# Boot session — her sayfa yüklemesinde app başlıklarını değiştirir
boot_session = "netasys.boot.boot_session"

# Before request — belirli domainler (demo.netasys.com.tr) için otomatik giriş yaptırır
before_request = ["netasys.api.auto_login_demo"]

fixtures = [
    "Custom Field",
    "Property Setter",
    "Translation",
    {"dt": "System Settings"},
    {"dt": "Website Settings"},
    {"dt": "Navbar Settings"}
]

after_install = "netasys.install.after_install"
