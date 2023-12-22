import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    nombre: String,
    precio: String,
    img: String,
    medidas: String,
},{
    versionKey: false
})

const productModel = model('Product', productSchema)

export { productModel }