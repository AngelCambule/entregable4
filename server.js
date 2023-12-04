import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'

import { Server } from 'socket.io'

const app = express()
const PORT = 5000
const httpServer = app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))

const socketServer = new Server(httpServer)

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

app.use(express.static(`${__dirname}/public`))

app.get('/', (req,res) => {
    const array = [
        {nombre:"Angel",apellido:"Cambule",edad:23,correo:"ass@hotmail.com",telefono:1233},
        {nombre:"Pedro",apellido:"Cambule",edad:25,correo:"as23s@hotmail.com",telefono:123123},
        {nombre:"Nicolas",apellido:"Cambule",edad:52,correo:"aswws@hotmail.com",telefono:12333233},
        {nombre:"Blanca",apellido:"Chandi",edad:55,correo:"asccs@hotmail.com",telefono:123223},
        {nombre:"Nene",apellido:"bb",edad:1,correo:"asnmns@hotmail.com",telefono:122333}
    ]
    const numAl = Math.round(Math.random()*4)
    console.log(numAl);
    res.render('index', {
        numAl: numAl,
        title: "DECO",
        nombre: array[numAl].nombre,
        apellido: array[numAl].apellido,
        edad: array[numAl].edad,
        correo: array[numAl].correo,
        telefono: array[numAl].telefono
    })
})

socketServer.on("connection", (socketClient) => {
    console.log("Nuevo cliente conectado");
})