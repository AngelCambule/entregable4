import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewRouter from "./routes/views.routes.js";
import { password, PORT, db_name } from './env.js'
import productRouter from './routes/products.routes.js'
import ProductDao from './daos/ProductDBManager.dao.js'
import CartDao from './daos/CartDBManager.dao.js';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

const app = express()

const httpServer = app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))

const socketServer = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  `mongodb+srv://jkzcs:${password}@cluster0.xnombsi.mongodb.net/${db_name}?retryWrites=true&w=majority`
)
.then(() => {
  console.log('DB Connected');
})
.catch((err) => {
  console.log(err);
})

app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)
app.use("/", viewRouter);
app.use(express.static(`${__dirname}/public`))
app.use('/api/products', productRouter)

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))


socketServer.on('connection', (socketClient) => {
  socketClient.on('messagertp', async (data) => {
    console.log(data);
    try {
      const arrayp = await ProductDao.getProducts()
    socketClient.emit('btns', arrayp)
    socketClient.emit('cart', await CartDao.getCart())

    } catch (err) {
      console.log(err);
    }
    
  })
  socketClient.on('newcart', async (data) => {
    
    try {
      console.log('Se agrego ' + data);
      await CartDao.addToCart(data)
      socketClient.emit('cart', await CartDao.getCart())
    } catch (err){
      console.log(err);
    }
  })
  socketClient.on('elimcart', async (id) => {
    try {
      const newCart = await CartDao.deleteToCart(id)
      socketClient.emit('cart', newCart)
    }catch (err){
      console.log(err);
    }
  })
  
})