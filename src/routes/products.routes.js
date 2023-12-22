import { Router } from 'express'
import { productModel } from '../models/products.model.js'
import ProductDao from '../daos/ProductDBManager.dao.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await ProductDao.getProducts()
        res.render('realTimeProducts', {
            products,
            fileCss: "styles.css"
        })
    }catch (err) {
        res.json(err);
    }
    
})

router.post('/', async (req, res) => {
    try {
        const product = req.body
        const response = await ProductDao.addProduct(product)

        res.json({
            message: "OK",
            response
        })
    }catch (error){
        res.json({
            message: "Error",
            error,
        })
    }
})

router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params

        const exists = await productModel.find({ _id : id})
    
        if (!exists){
            return res.json({
                message: "No se encontro el user"
            })
        }
    
        const updProduct = req.body
        const response = await productModel.updateOne({_id: id}, updProduct)

        if(response.modifiedCount == 0){
            res.json({
                message: "User not updated",
                response
            })
        }
        
    }catch (error) {
        console.log(error);
        res.json({
            message: "Error",
            error
        })
    }
    
router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params
        const response = await productModel.findByIdAndDelete({ _id : id})
    
        if (!response){
            return res.json({
                message: "No se encontro el user"
            })
        }

        console.log(response);
        
    }catch (error){
        console.log(error);
        res.json({
            message: "Error",
            error
        })
    }
})
})

export default router