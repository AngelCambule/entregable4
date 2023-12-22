const socketClient = io();

socketClient.emit("messagertp", "Mensaje desde el cliente");

const productsList = document.querySelector('.productsList')
const cartList = document.querySelector('.cartList')
const totalCarrito = document.querySelector('.total')

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
      cartList.innerHTML += `<p>${c.nombre} - ${c.precio} - Cantidad: ${c.qty}</p>
      <button id='eliminar${c.id}'>Eliminar</button>
      <button id='menos${c.id}'>-</button>
      <button id='mas${c.id}'>+</button>`
      setTimeout(() => {
        const menosqty = document.querySelector(`#menos${c.id}`)
        const masqty = document.querySelector(`#mas${c.id}`)

        masqty.addEventListener('click', (e) => {
          e.preventDefault()
          socketClient.emit('newcart', c)
        })

        menosqty.addEventListener('click', (e) => {
          e.preventDefault()
          socketClient.emit('qtycartmenos', c)
        })

        const btnEliminar = document.querySelector(`#eliminar${c.id}`)
        
        btnEliminar.addEventListener('click', (e) => {
          e.preventDefault()
          console.log(`Se elimino del carrito: ${c.nombre}`);
          socketClient.emit('elimcart', c.id)
        })

      },1)
    })
    const total = await data.reduce((acumulador, carrito) => acumulador + (carrito.precio * carrito.qty), 0)
    totalCarrito.innerHTML = `<p>Total: $${total}</p>`
  }catch (err) {
    console.log(err);
  }
})