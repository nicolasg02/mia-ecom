let pedidoModal = document.querySelector('.pedidoModal');
let totalDisplay = document.querySelector('#costoTotal');
let totalCard = document.querySelector('.total-card');
let beforeTotalCard = document.querySelector('.before-total-card');
let submitPedido = document.querySelector('#submitPedido');
let ordenUl = document.querySelector('#orden-ul');
let modalForm = document.querySelector('.modal-form');
let displayTotal = document.querySelector('.displayTotal');

//detiene el scrolling event proveniente de fullpage.js cuando se abre el modal de pedidos
pedidoModal.addEventListener('wheel', e => {
  e.stopImmediatePropagation()
}, true);

let pedidosObj = {
  pizzas: {
    Napolitana: { amount: 0, price: 0 },
    Mozzarella: { amount: 0, price: 0 },
    Calabresa: { amount: 0, price: 0 },
    Pepperoni: { amount: 0, price: 0 }
  },
  seleccionadas: [],
  total: 0,
};

function updatePizzaButton(pizza) {
  pizza.classList.remove('disabled');
}

function updateItem(pizza) {
  let cantidadSeleccionada = +pizza.value;
  let pizzaSeleccionada = pizza.id;
  let pizzaSeleccionadaIndex = pizza.selectedIndex;
  let precioTotal = 0;
  
  for (let sabor in pedidosObj.pizzas) {
    let saborObj = pedidosObj.pizzas[sabor];

    // guardar pizzas y precio total (...pizzas.seleccionadas & ...pizzas.total)
    if (pizzaSeleccionada == sabor) {
      if (pizzaSeleccionadaIndex != 0) {
        saborObj.amount = cantidadSeleccionada;
        saborObj.price = 200 * cantidadSeleccionada;
        
        pedidosObj.seleccionadas.push(pizzaSeleccionada);
      } else {
        saborObj.price = 0;
        saborObj.amount = 0;
        
        if (pedidosObj.seleccionadas.includes(pizzaSeleccionada)) {
          pedidosObj.seleccionadas = pedidosObj.seleccionadas.filter(el => el != pizzaSeleccionada);
        }
      }
    }

    precioTotal += saborObj.price;
    pedidosObj.total = precioTotal;
  }

  beforeTotalCard.classList.add('d-none');
  totalCard.classList.remove('d-none');
  totalDisplay.innerHTML = precioTotal;
}

submitPedido.addEventListener('click', function() {
  ordenUl.innerHTML = '';
  for (pizza in pedidosObj.pizzas) {
    if (pedidosObj.seleccionadas.includes(pizza)) {
      let newSpan = document.createElement('span');
      newSpan.className = 'ms-2 badge bg-dark rounded-pill';
      newSpan.innerHTML = `x${pedidosObj.pizzas[pizza].amount}`;
      
      let newLi = document.createElement('li');
      newLi.className = 'list-group-item';
      newLi.innerHTML = `Pizza ${pizza} ${newSpan.outerHTML}`;

      
      ordenUl.appendChild(newLi);
    }
  }

  displayTotal.innerHTML = pedidosObj.total;
  modalForm.reset();
});

function costoEnvio() {
  let value = document.querySelector('#inputPartido').value;

  if (document.querySelector('.costo-envio')) {
    document.querySelector('.costo-envio').remove();
  }

  function costo(precio) {
    let newSpan = document.createElement('span');
    newSpan.className = 'ms-2 badge bg-dark rounded-pill';
    newSpan.innerHTML = `$${precio}`;
    let newLi = document.createElement('li');
    newLi.className = 'list-group-item costo-envio';
    newLi.innerHTML = `Envio ${newSpan.outerHTML}`;
    ordenUl.appendChild(newLi);
  }

  if (value == 'Quilmes') {
    costo('300');
    pedidosObj.total += 300;
  } else if (value == 'Avellaneda') {
    costo('200');
    pedidosObj.total += 200;
  } else if (value == 'Lanus') {
    costo('400');
    pedidosObj.total += 400;
  } else if (value == 'Lomas de Zamora') {
    costo('500');
    pedidosObj.total += 500;
  }

  displayTotal.innerHTML = pedidosObj.total;
}

