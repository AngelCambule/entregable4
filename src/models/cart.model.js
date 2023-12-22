import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
    id: Number,
    nombre: String,
    precio: Number,
    qty: Number,

},{
    versionKey: false
})

const cartModel = model('carts', cartSchema)

export {cartModel}