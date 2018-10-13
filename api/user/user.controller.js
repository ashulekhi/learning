const UserService = require('./user.service');
const CryptoJS = require('crypto-js');
const AuthService = require('../authservice');


exports.getUsers = (req,res)=>{
    UserService.listAll()
    .once('ERROR' , (err)=>{
        res.send(err);
    })
    .once('NOT_FOUND' , ()=>{
      res.send("No Users Found");
    })
  .once('SUCCESS' , (users)=>{
      res.send(users);
   })
  }

exports.createUser = (req,res)=>{
UserService.newUser(req.body)
.once('ERROR',(err)=>{
   res.send(err)
})
.once('SUCCESS',(err)=>{
    res.send("USER REGISTERES")
})
.once('ALREADY_EXISTS',(err)=>{
    res.send({
        message:"User Already Exists"
    })
})
}


exports.login = (req,res)=>{
    var password = CryptoJS.HmacSHA1(req.body.password,"mysecretkey").toString();
    var data = {
        email:req.body.email,
        password:password
    }

    UserService.findUser(data)
    .once('ERROR' , ()=>{
            res.send('ERROR')
    })
    .once('SUCCESS' , ()=>{
        console.log("here we will set token")
        AuthService.setToken(req.body.email)
        .once('SUCCESS' ,(data)=>{
           res.send(data)
        })
        .once('ERROR' ,(err)=>{
            res.send("Error in Login")
        })
    })
    .once('INVALID_LOGIN' , ()=>{
        res.send({
            message:"Invalid Credentials"
        })
    })


}