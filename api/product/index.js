const Express = require('express');

const router = Express.Router();
const ProductController = require('./product.controller');

router.get('/api/allproducts' ,ProductController.getProducts);
router.post('/api/createproduct',ProductController.createProduct)




module.exports = router;