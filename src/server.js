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

const users = [];

socketServer.on("connection", (socketClient) => {
    
    console.log("Nuevo cliente conectado");

    socketClient.on("message", (data) => {
      console.log(data);
    });
  
    socketClient.emit("server_message", "Mensaje desde el servidor");
  
    // Mensaje para todos, menos para el que hace la conexion
    socketClient.broadcast.emit("message_all", `${socketClient.id} Conectado`);
  
    // Mensaje para todos
    socketServer.emit("message_all_2", "Mensaje a todos");
  
    // Mensajes del form
    socketClient.on("form_message", (data) => {
      console.log(data);
      const asd = users.find((u) => u.name === data.name)
      if (!asd){
        users.push(data);
      
      }else{
        asd.qty = asd.qty + data.qty
      }
      
      socketClient.emit("users_list", users);
    });
    
  
    socketClient.emit("users_list", users);
    
  });
  