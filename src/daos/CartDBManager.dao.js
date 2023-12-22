import { cartModel } from "../models/cart.model.js";

class CartDao {
    async getCart(){
        return await cartModel.find().lean()
    }
    async addToCart(data){
        console.log(data);
        try {
            const currentCart = await cartModel.find({id: data.id})
            
            if (currentCart[0]){
                const qtycurrent = currentCart[0].qty + 1
                currentCart[0].qty = qtycurrent 
                let addedProduct = currentCart[0]
                return await cartModel.updateOne({id: currentCart[0].id},addedProduct)
            }else{
                return await cartModel.create(data)
            }
        } catch (err) {
            console.log(err);
        }
        
        
    }
    async deleteToCart(id){
        try {
            await cartModel.deleteOne({id: id})
            return cartModel.find()
        }catch (err){
            console.log(err);
        }
    }
}

export default new CartDao()