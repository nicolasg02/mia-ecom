let pedidoModal = document.querySelector('.pedidoModal')
let totalDisplay = document.querySelector('#costoTotal')
let totalCard = document.querySelector('.total-card')
let beforeTotalCard = document.querySelector('.before-total-card')
let submitPedido = document.querySelector('#submitPedido')
let ordenUl = document.querySelector('#orden-ul')
let modalForm = document.querySelector('.modal-form')
let displayTotal = document.querySelector('.displayTotal')

let pizza1 = document.querySelector('#pizza1')
let pizza2 = document.querySelector('#pizza2')
let pizza3 = document.querySelector('#pizza3')
let pizza4 = document.querySelector('#pizza4')

let inputNombre = document.querySelector('#inputNombre')
let confirmarModal = document.querySelector('#confirmarModal')

//detiene el scrolling event proveniente de fullpage.js cuando se abre el modal de pedidos
pedidoModal.addEventListener(
  'wheel',
  (e) => {
    e.stopImmediatePropagation()
  },
  true
)

let pedidosObj = {
  pizzas: {
    Napolitana: { amount: 0, price: 0 },
    Mozzarella: { amount: 0, price: 0 },
    Calabresa: { amount: 0, price: 0 },
    Pepperoni: { amount: 0, price: 0 },
  },
  seleccionadas: [],
  total: 0,
  envio: 0,
}

let ordenFinal = {
  nombre: '',
  direccion: '',
  partido: '',
  localidad: '',
  codigoPostal: '',
  notas: '',
  orden: [],
  envio: '',
  total: '',
}

function updatePizzaButton(pizza) {
  pizza.classList.remove('disabled')
}

function updateItem(pizza) {
  let cantidadSeleccionada = +pizza.value
  let pizzaSeleccionada = pizza.id
  let pizzaSeleccionadaIndex = pizza.selectedIndex
  let precioTotal = 0

  function applyStyleCartButton(pizza) {
    pizza.classList.remove('btn-light')
    pizza.classList.add('btn-success')

    pizza.innerHTML = `<i class="fas fa-check"></i> Agregado al carrito!`
  }

  function deStyleCartButton(pizza) {
    pizza.classList.remove('btn-success')
    pizza.classList.add('btn-light')

    pizza.innerHTML = `<i class="fas fa-times"></i> Eliminado!`
  }

  if (pizza == Napolitana) {
    pizza = pizza1
    applyStyleCartButton(pizza1)
  } else if (pizza == Mozzarella) {
    pizza = pizza2
    applyStyleCartButton(pizza2)
  } else if (pizza == Calabresa) {
    pizza = pizza3
    applyStyleCartButton(pizza3)
  } else if (pizza == Pepperoni) {
    pizza = pizza4
    applyStyleCartButton(pizza4)
  }

  for (let sabor in pedidosObj.pizzas) {
    let saborObj = pedidosObj.pizzas[sabor]

    // guardar pizzas y precio total (...pizzas.seleccionadas & ...pizzas.total)
    if (pizzaSeleccionada == sabor) {
      if (pizzaSeleccionadaIndex != 0) {
        saborObj.amount = cantidadSeleccionada
        saborObj.price = 200 * cantidadSeleccionada

        pedidosObj.seleccionadas.push(pizzaSeleccionada)
      } else {
        saborObj.price = 0
        saborObj.amount = 0
        deStyleCartButton(pizza)

        if (pedidosObj.seleccionadas.includes(pizzaSeleccionada)) {
          pedidosObj.seleccionadas = pedidosObj.seleccionadas.filter(
            (el) => el != pizzaSeleccionada
          )
        }
      }
    }

    precioTotal += saborObj.price
    pedidosObj.total = precioTotal
  }

  beforeTotalCard.classList.add('d-none')
  totalCard.classList.remove('d-none')
  totalDisplay.innerHTML = precioTotal
}

submitPedido.addEventListener('click', function () {
  ordenUl.innerHTML = ''
  for (pizza in pedidosObj.pizzas) {
    if (pedidosObj.seleccionadas.includes(pizza)) {
      ordenFinal.orden.push(`${pizza} x${pedidosObj.pizzas[pizza].amount} `)

      let newSpan = document.createElement('span')
      newSpan.className = 'ms-2 badge bg-dark rounded-pill'
      newSpan.innerHTML = `x${pedidosObj.pizzas[pizza].amount}`

      let newLi = document.createElement('li')
      newLi.className = 'list-group-item'
      newLi.innerHTML = `Pizza ${pizza} ${newSpan.outerHTML}`

      ordenUl.appendChild(newLi)
    }
  }

  displayTotal.innerHTML = pedidosObj.total
  modalForm.reset()
})

function costoEnvio() {
  let value = document.querySelector('#inputPartido').value

  if (document.querySelector('.costo-envio')) {
    document.querySelector('.costo-envio').remove()
    pedidosObj.envio = 0
  }

  function costo(precio) {
    let newSpan = document.createElement('span')
    newSpan.className = 'ms-2 badge bg-dark rounded-pill'
    newSpan.innerHTML = `$${precio}`
    let newLi = document.createElement('li')
    newLi.className = 'list-group-item costo-envio'
    newLi.innerHTML = `Envio ${newSpan.outerHTML}`
    ordenUl.appendChild(newLi)

    pedidosObj.envio += precio
  }

  if (value == 'Avellaneda') costo(200)
  if (value == 'Quilmes') costo(300)
  if (value == 'Lanus') costo(400)
  if (value == 'Lomas de Zamora') costo(500)

  ordenFinal.partido = value

  displayTotal.innerHTML = pedidosObj.total + pedidosObj.envio

  ordenFinal.envio = pedidosObj.envio
  ordenFinal.total = pedidosObj.total + pedidosObj.envio
}

inputNombre.addEventListener('blur', function () {
  ordenFinal.nombre = inputNombre.value
})

inputDireccion.addEventListener('blur', function () {
  ordenFinal.direccion = inputDireccion.value
})

inputLocalidad.addEventListener('blur', function () {
  ordenFinal.localidad = inputLocalidad.value
})

inputCP.addEventListener('blur', function () {
  ordenFinal.codigoPostal = inputCP.value
})

inputNotas.addEventListener('blur', function () {
  ordenFinal.notas = inputNotas.value
})

confirmarModal.addEventListener('click', function () {
  let mensaje = `
    *** Nuevo Pedido ***
    Nombre: ${ordenFinal.nombre}
    Direccion: ${ordenFinal.direccion}
    Partido: ${ordenFinal.partido}
    Localidad: ${ordenFinal.localidad}
    Codigo Postal: ${ordenFinal.codigoPostal}
    Notas: "${ordenFinal.notas}"
    Orden: ${ordenFinal.orden}
    Envio: $${ordenFinal.envio}
    Total: $${ordenFinal.total}
  `

  let encode = encodeURI(mensaje)

  window.location.href = `https://wa.me/541135663479?text=${encode}`
})
