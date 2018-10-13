var Jwt = require('jsonwebtoken');
var EventEmitter = require('events');
var UserModel = require("./user/user.model")

var token = Jwt.sign({name:"ashu"},"mysecretkey",{
    expiresIn:300
})

exports.isAuthenticated = (req,res,next)=>{
let token = req.get('authtoken')
Jwt.verify(token,'mysecretkey',(err,payload)=>{
    console.log("payload" ,payload , err)
    if(err){
        res.send("Session Expired")
    }
    else{
        if(payload){
            let findObj = {
                email:payload.email
            }
            UserModel.findOne(findObj,(err,data)=>{
                Jwt.verify(data.token,'mysecretkey',(err,payload)=>{
                    console.log("from database" , payload);
                    if(err){
                        res.send('Session Expired / Not Auhtenticated')
                    }
                    else{
                        next()
                    }
                })
            })
        }
        else{
            res.send('Session Expired / Not Auhtenticated')
        }
        
    }
})
}



exports.refreshToken = (req,res,next)=>{
    let token = req.get('authtoken')    
    Jwt.verify(token,'mysecretkey',(err,payload)=>{
        console.log("payload" ,payload)
        if(err){
            res.send("Session Expired")
        }
        else{
            let updatedtoken = Jwt.sign(payload,'mysecretkey',{expiresIn:300})
            UserModel.findOneAndUpdate(payload,{$set:{token:updatedtoken}},{new:true},(err,data)=>{
               if(err){
                   res.send("Internal Server Error")
               }
               else{
                   next();
               }
            })
        }
    })
    
}


exports.setToken = (data)=>{
let emitter = new EventEmitter();
Jwt.sign({
    email:data
},"mysecretkey" , {expiresIn:300} , (err,token)=>{
    console.log(err , token);
    console.log("email is" , data);
    UserModel.findOneAndUpdate({email:data},{$set:{token:token}},{new:true},(err,updatedUser)=>{
        if(err){
            console.log("error in updating token");
            return emitter.emit('ERROR');
        }
        else{
            console.log("token set" , updatedUser)
            return emitter.emit('SUCCESS',updatedUser)
        }
    })
})

return emitter
}


