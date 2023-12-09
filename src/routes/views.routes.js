import { Router } from "express";
import { ProductManager } from '../public/js/ProductManager.js'
import { CartManager } from '../public/js/CartManager.js'

const productManager = new ProductManager('products.json');
const cartManager = new CartManager('cart.json');

const router = Router();

router.get('/', (req, res) => {
  res.render("index", {
    
  });
  
  
});

router.get('/realtimeproducts', (req,res) => {
  const products = productManager.getProducts()
  res.render("realTimeProducts", {
    title: "Cart",
    prods: products
  })
})
router.post('/realtimeproducts', (req,res) => {
  const newCart = req.body;
  const cartId = cartManager.createCart(newCart);
  res.status(201).json({ cartId });
})
router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  productManager.addProduct(newProduct);
  res.status(201).json({ message: 'Producto agregado' });
});

router.put('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body;
  productManager.updateProduct(productId, updatedProduct);
  res.json({ message: 'Producto actualizado correctamente' });
});

router.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  productManager.deleteProduct(productId);
  
    res.json({ message: 'Producto borrado exitosamente' });
  
});

//Cart

router.post('/', (req, res) => {
  const newCart = req.body;
  const cartId = cartManager.createCart(newCart);
  res.status(201).json({ cartId });
});

router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cart = cartManager.getCartById(cartId);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid);
  const success = cartManager.addToCart(cartId, productId);
  
  if (success) {
    res.json({ message: 'Producto agregado al carrito' });
  } else {
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
});

export default router;
