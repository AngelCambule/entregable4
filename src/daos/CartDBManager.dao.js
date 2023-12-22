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
                currentCart[0].qty += 1
                console.log('Se sumo una unidad de ' + data.nombre);
                return await cartModel.updateOne({id: currentCart[0].id}, currentCart[0])
            }else{
                console.log('Se agrego al carrito ' + data.nombre);
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
    async deleteQty(data){
        try {
            console.log(data);
            if(data.qty > 1){
                data.qty -= 1
                console.log('Se resto una unidad de ' + data.nombre);
                await cartModel.updateOne({id: data.id}, data)
                return await cartModel.find()
            }else{
                console.log('Se elimino del carrito ' + data.nombre);
                return await this.deleteToCart(data.id)
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export default new CartDao()