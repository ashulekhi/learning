const Mongoose = require('mongoose');


let ProductSchema = new Mongoose.Schema({
    productId:{type: Date ,default : Date.now()},
    name:{type:String , required:true},
    quantity:{type:Number , default:0},
    description:{type:String},
    createdAt:{type:Date , default:Date.now()},
    brand:{type:String , required:true},
    ratings:{type:String},
    price:{type:Number,required:true},
    image:{type:String,default:'No Image Available'}
})


const ProductModel = Mongoose.model('product',ProductSchema);

module.exports = ProductModel;