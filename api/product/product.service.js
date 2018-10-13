const ProductModel = require("./product.model");
var EventEmitter = require('events');



exports.listAll = ()=>{

    let emitter = new EventEmitter();
    console.log("here we have to get products")
    ProductModel.find({},(err,products)=>{
        if(err){
            console.log("errr" , err);
           return emitter.emit('ERROR' , err)
        }
        else{
            console.log("products" , products);
            if(products.length>0){
               return emitter.emit('SUCCESS',products)
            }
            else{
               return emitter.emit("NOT_FOUND")
            }
        }
    })

    return emitter
}


exports.create = (data , callback)=>{
    console.log("here we will create the product" , data);
    if(data){
        var Product =new ProductModel(data);
        Product.save((err,product)=>{
            if(err){
                console.log("error in creating product" , err);
                callback(err,null);
            }
            else{
                console.log("new product created" ,product)
                callback(null,product)
            }
         })
    }
    else{
        console.log("No data found for product");
    }
}