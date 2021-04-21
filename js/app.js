let pedidoDesktop = document.querySelector('.pedido-desktop');
let pedidoMobile = document.querySelector('.pedido-mobile');

// pedidos desktop/mobile
if (window.innerWidth <= 992) {
  pedidoDesktop.classList.add('d-none');
} else {
  pedidoMobile.classList.add('d-none');
}