const socketClient = io();

socketClient.emit("message", "Mensaje desde el formulario");

const button = document.querySelector("#button");

socketClient.on("users_list", (data) => {
  console.log(data);
  
  const div = document.querySelector(".cartList");

  div.innerHTML = `${data.map((product) => `${product.name} - ${product.qty} <button id="menos${product.name}">-</button><br/>`)}`;
  
});



button.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name");
  const qty = document.querySelector("#qty");

  const product = {
    name: name.value,
    qty: parseInt(qty.value)
  };

  socketClient.emit("form_message", product);
});
