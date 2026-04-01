// ─── Netasys Brand Override ───────────────────────────────────────────
// Her /app sayfa yüklemesinde çalışır (app_include_js).
// Frappe/ERPNext markalarını Netasys ile değiştirir.
// ÖNEMLİ: Desktop workspace ikonlarını DEĞİŞTİRMEZ.

(function () {
	'use strict';

	var FAVICON    = '/assets/netasys/images/neta_favicon_dark.svg';
	var LOGO_DARK  = '/assets/netasys/images/neta_dark.png';   // açık tema → koyu logo
	var LOGO_LIGHT = '/assets/netasys/images/neta_light.png';  // koyu tema → açık logo

	// ── Tema algılama yardımcı ────────────────────────────────────────
	function getCurrentTheme() {
		return document.documentElement.getAttribute('data-theme') ||
		       document.documentElement.getAttribute('data-theme-mode') ||
		       'light';
	}

	function getLogoForTheme() {
		return getCurrentTheme() === 'dark' ? LOGO_LIGHT : LOGO_DARK;
	}

	// ── 1. Favicon (tarayıcı sekmesi ikonu) ──────────────────────────
	function setFavicon() {
		var links = document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']");
		links.forEach(function (link) {
			if (link.href && link.href.indexOf(FAVICON) === -1) {
				link.href = FAVICON;
			}
		});
		if (links.length === 0) {
			var newLink = document.createElement('link');
			newLink.rel  = 'shortcut icon';
			newLink.href = FAVICON;
			newLink.type = 'image/svg+xml';
			document.head.appendChild(newLink);
		}
	}

	// ── 2. Tema bazlı logo değiştirme ────────────────────────────────
	//    Desktop sayfasındaki #brand-logo ve
	//    hooks.py brand_html ile eklenen #neta-logo hedeflenir.
	function updateLogos() {
		var logo = getLogoForTheme();
		var selectors = ['#brand-logo', '#neta-logo'];
		selectors.forEach(function (sel) {
			var img = document.querySelector(sel);
			if (img && img.src && img.src.indexOf(logo) === -1) {
				img.src = logo;
			}
		});
	}

	// ── 3. Splash ekranı ─────────────────────────────────────────────
	function replaceSplash() {
		var changed = false;
		document.querySelectorAll('.splash-screen img, #splash img').forEach(function (img) {
			if (img.src && img.src.indexOf('netasys') === -1) {
				img.src = LOGO_LIGHT;
				changed = true;
			}
		});
		return changed;
	}

	// ── 4. Sayfa başlığı ─────────────────────────────────────────────
	function fixTitle() {
		if (document.title && /ERPNext|Frappe/i.test(document.title)) {
			document.title = document.title
				.replace(/ERPNext/gi, 'Netasys')
				.replace(/Frappe/gi, 'Netasys');
		}
	}

	// ── Çalıştır (tek seferlik) ──────────────────────────────────────
	setFavicon();
	replaceSplash();

	document.addEventListener('DOMContentLoaded', function () {
		setFavicon();
		replaceSplash();
		updateLogos();
		fixTitle();
	});

	if (window.frappe && frappe.ready) {
		frappe.ready(function () {
			updateLogos();
			fixTitle();
		});
	}

	// ── Tema değişikliği dinleyici ────────────────────────────────────
	//    data-theme attribute değişince logoyu güncelle.
	var themeObserver = new MutationObserver(function (mutations) {
		for (var i = 0; i < mutations.length; i++) {
			if (mutations[i].attributeName === 'data-theme' ||
			    mutations[i].attributeName === 'data-theme-mode') {
				updateLogos();
				break;
			}
		}
	});
	themeObserver.observe(document.documentElement, { attributes: true });

	// ── Splash için kısa süreli observer ─────────────────────────────
	var splashDone = false;
	var splashObs = new MutationObserver(function () {
		if (!splashDone) {
			splashDone = replaceSplash();
			if (splashDone) {
				splashObs.disconnect();
			}
		}
		// Logo ilk yüklenmede de güncellensin
		updateLogos();
	});
	splashObs.observe(document.documentElement, { childList: true, subtree: true });
	setTimeout(function () {
		splashObs.disconnect();
		// Son kez güncelle
		updateLogos();
	}, 5000);
})();
