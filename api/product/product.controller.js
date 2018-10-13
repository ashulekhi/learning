const ProductService = require("./product.service")

exports.getProducts = (req,res)=>{
  ProductService.listAll()
  .once('ERROR' , (err)=>{
      res.send(err);
  })
  .once('NOT_FOUND' , ()=>{
    res.send("No Products Found");
  })
.once('SUCCESS' , (products)=>{
    res.send(products);
 })
}

exports.createProduct = (req,res)=>{
    ProductService.create(req.body,(err,product)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(product);
        }
    })
}