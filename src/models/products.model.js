import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    nombre: String,
    precio: Number,
    img: String,
    medidas: String,
    id: Number
},{
    versionKey: false
})

const productModel = model('Product', productSchema)

export { productModel }