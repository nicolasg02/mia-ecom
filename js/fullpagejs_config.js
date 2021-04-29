new fullpage('#fullpage', {
	licenseKey: null,
	autoScrolling: true,
	fitToSection: false,
  // navigation
  navigation: true,
  menu: '#myMenu',
  anchors: ['inicio', 'quienes-somos', 'pedido', 'objetivo', 'galeria', 'mas-info'],
  navigationTooltips: ['Inicio', 'Quiénes somos', 'Hacé tu pedido', 'Nuestro objetivo', 'Galería', 'Más Información']
});

//methods
fullpage_api.setAutoScrolling(false);


if (window.innerWidth >= 1200) {
	fullpage_api.setAutoScrolling(true);
}