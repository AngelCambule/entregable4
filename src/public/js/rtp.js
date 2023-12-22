const socketClient = io();

socketClient.emit("messagertp", "Mensaje desde el cliente");

const productsList = document.querySelector('.productsList')
const cartList = document.querySelector('.cartList')

socketClient.on('btns', async (data) => {
  try {
     data.forEach( (p) => {
       
      productsList.innerHTML += `<div class='asd'><p>${p.nombre} - ${p.precio}</p><button id="agr${p.id}" class='btn'>Agregar</button></div>`
      setTimeout(() => {
        const btnAgregar = document.querySelector(`#agr${p.id}`)
        btnAgregar.addEventListener('click', (e) => {
          e.preventDefault()
          
          const product = {
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            qty: 1
          }
          console.log(`Se agrego: ${product.nombre}`);
          socketClient.emit('newcart', product)
        })
      },1)
      
      
    })
    
  }catch (err) {
    console.log(err);
  }
  
})

socketClient.on('cart', async (data) => {
  
  try {
    cartList.innerHTML = ''
    await data.forEach((c) => {
      cartList.innerHTML += `<p>${c.nombre} - ${c.precio} - Cantidad: ${c.qty}</p><button id='eliminar${c.id}'>Eliminar</button>`
      setTimeout(() => {
        const btnEliminar = document.querySelector(`#eliminar${c.id}`)
        btnEliminar.addEventListener('click', (e) => {
          e.preventDefault()
          console.log(`Se elimino del carrito: ${c.nombre}`);
          socketClient.emit('elimcart', c.id)
        })
      },1)
    })
  }catch (err) {
    console.log(err);
  }
})