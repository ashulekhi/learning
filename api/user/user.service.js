const UserModel = require("./user.model");
const CryptoJS = require('crypto-js');
let EventEmitter =require('events');

exports.listAll = ()=>{

    let emitter = new EventEmitter();
    console.log("here we have to get users")
    UserModel.find({},{name:1,email:1,createdAt:1},(err,users)=>{
        if(err){
            console.log("errr" , err);
           return emitter.emit('ERROR' , err)
        }
        else{
            console.log("products" , users);
            if(users.length>0){
               return emitter.emit('SUCCESS',users)
            }
            else{
               return emitter.emit("NOT_FOUND")
            }
        }
    })

    return emitter
}

exports.newUser = (data)=>{
    let emitter  = new EventEmitter();
if(data){
UserModel.findOne({email:data.email},(err,user)=>{
if(err){
    console.log("error in new user method" ,err)
    return emitter.emit("ERROR")
}
else{
    console.log("...." , user);
    if(user){
        console.log("user already exists" , user)
        return emitter.emit('ALREADY_EXISTS')
    }
    else{
        console.log("we have to create a user here" , data)
        data.password=CryptoJS.HmacSHA1(data.password,"mysecretkey");
        console.log(" password after encryption" , data.password.toString())
        
        if(validateEmail(data.email)){
            console.log(data);
            let newUser = new UserModel(data)
            console.log("user before saving" , newUser);
           newUser.save((err,user)=>{
                if(err){
                    return emitter.emit('ERROR',err)
                }
                else{
                    return emitter.emit('SUCCESS',user);
                }
            })
        }
        else{
            console.log("Error in validating email")
            return emitter.emit('ERROR')
        } 
    }
}
})
}
return emitter
}


exports.findUser = (data)=>{
    console.log(data,"data");
   let emitter = new EventEmitter();
   UserModel.findOne(data , (err,user)=>{
       if(err){
           console.log(">>>err" , err)
           return emitter.emit('ERROR')
       }
       else{
          if(user){
            return emitter.emit('SUCCESS') 
          }
          else{
              return emitter.emit('INVALID_LOGIN')
          }
           
       }
   })

   return emitter
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}