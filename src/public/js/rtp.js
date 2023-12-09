const socketClient = io();

socketClient.emit("message", "Mensaje desde el cliente");

const button = document.querySelector("#button");

socketClient.on("server_message", (data) => {
  console.log(data);
})

socketClient.on("shop_list", (data) => {
  console.log(data);
  
  const div = document.querySelector(".cartList");

  div.innerHTML = `${data.map((product) => `${product.name} - ${product.qty} <button id="menos">-</button><br/>`)}`;
  
});



button.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name");
  const qty = document.querySelector("#qty");

  const product = {
    name: name.value,
    qty: parseInt(qty.value)
  };

  socketClient.emit("shop_message", product);
});
