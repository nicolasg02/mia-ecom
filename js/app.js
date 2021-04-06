const myFullpage = new fullpage('#fullpage', {
  // options
  css3: true,
  autoScrolling: true,
  fitToScreen: false,
  fitToSectionDelay: 300,
  easing: 'easeInOutCubic',
  scrollingSpeed: 700,
  easingcss3: 'ease-out',
  loopBottom: false,
  // * navegacion
  navigation: true,
  menu: '#myMenu',
  anchors: ['inicio', 'quienesSomos', 'pedido', 'historia', 'galeria'],
  navigationTooltips: ['Inicio', 'Quienes Somos', 'Hace tu pedido', 'Historia', 'Galeria'],
  showActiveTooltip: true,
});
