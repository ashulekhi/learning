const Mongoose =  require('mongoose');

const UserSchema = new Mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    verified:{type:Boolean,default:false},
    imageUrl:{type:String },
    createdAt:{type:Date,default:Date.now()},
    verifiedAt:{type:Date},
    phone:{type:Number},
    password:{type:String , required:true},
    lastpassword:{type:String},
    dateofbirth:{type:Date},
    role:{type:String,default:'user'},
    token:{type:String}
})


let UserModel = Mongoose.model('user',UserSchema)

module.exports = UserModel;