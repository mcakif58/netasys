// netasys/public/js/theme_logo.js
setInterval(function () {
	var img = document.querySelector('#brand-logo');
	if (!img) return;
	var t = document.documentElement.getAttribute('data-theme') || 'light';
	img.src = t === 'dark'
	? '/assets/netasys/images/neta_light.png'
	: '/assets/netasys/images/neta_dark.png';
}, 500);
