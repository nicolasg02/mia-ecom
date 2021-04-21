new fullpage('#fullpage', {
  licenseKey: null,
	autoScrolling:true,
  // navigation
  navigation: true,
  menu: '#myMenu',
  anchors: ['inicio', 'quienes-somos', 'pedido', 'historia', 'galeria'],
  navigationTooltips: ['Inicio', 'Quiénes somos', 'Hacé tu pedido', 'Historia', 'Galería', 'Más Información']
});

// desactivar fullpagejs en pantallas pequeñas
if (window.innerWidth <= 768) {
	fullpage_api.setAutoScrolling(false);
	fullpage_api.setFitToSection(false);
}
