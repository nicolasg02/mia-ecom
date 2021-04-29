let submitPedidos = document.querySelector('#submitPedidos');
let totalDisplay = document.querySelector('#costoTotal')

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

  totalDisplay.innerHTML = precioTotal;
}