import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewRouter from "./routes/views.routes.js";

import { Server } from 'socket.io'

const app = express()
const PORT = 5500
const httpServer = app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))

const socketServer = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)
app.use("/", viewRouter);
app.use(express.static(`${__dirname}/public`))

const cart = [];

socketServer.on("connection", (socketClient) => {

    socketClient.on("message", (data) => {
      console.log(data);
    });
  
    socketClient.emit("server_message", "Mensaje desde el servidor");
  
    socketClient.on("shop_message", (data) => {
      console.log(data);
      const asd = cart.find((u) => u.name === data.name)
      if (!asd){
        cart.push(data);
        console.log(`Se agrego ${data.name}`);
      }else{
        asd.qty = asd.qty + data.qty
        console.log(`Se agrego ${data.qty} unidad/es mas a ${data.name}`);
      }
      
      socketClient.emit("shop_list", cart);
    });
    
  
    socketClient.emit("shop_list", cart);
    
  });
  