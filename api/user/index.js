const Express = require('express');
const AuthService = require('../authservice')

const router = Express.Router();
const UserController = require('./user.controller');

router.post('/api/login',UserController.login)
router.post('/api/register' , UserController.createUser)
router.get('/api/users',UserController.getUsers)
// router.post('/api/admin' , AuthService.isAuthenticated , (req,res)=>{
// console.log("authenticated")
// } )




module.exports = router;