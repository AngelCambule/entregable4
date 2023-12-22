import { productModel } from "../models/products.model.js";
class ProductDao {
  
    async addProduct(productData) {
        return await productModel.create(productData)
    }
  
    async getProducts() {
        return await productModel.find().lean()
    }
  
    async getProductById(id) {
        return await productModel.findById({_id: id})
    }
  
    async updateProduct(id, updatedProduct) {
        return await productModel.updateOne({_id: id}, updatedProduct)
    }
  
    async deleteProduct(id) {
        return await productModel.deleteOne({_id: id})
    }
  }
  export default new ProductDao()