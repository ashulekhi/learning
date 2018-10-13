const Express = require('express');
const Multer = require('multer')
const Cors = require('cors');
const routes = require('./routes');
const bodyParser =require('body-parser');
const Cloudinary = require('cloudinary');
const Mongoose = require('mongoose');
const databaseUrl = "mongodb://ashulekhi:learning1234@ds131313.mlab.com:31313/learning"

Mongoose.connect(databaseUrl,(err,connection)=>{
    if(err){
       console.log(">>>>>> error" , err)
    }
    
})

Cloudinary.config({
    
        cloud_name: "ashudev", 
        api_key: "134152261557631", 
        api_secret: "oawm2Jgdgq1CVZOW4rule62V8aY" 
    
})


const server = Express();
var storage = Multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname+ '-' + Date.now()+".jpg");
        }
    }
);

var upload = Multer( { storage: storage } );


server.use(Cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(routes);
server.get("/",(req,res)=>{
    res.send("welcome to our Api")
})

server.post("/api/upload" ,upload.single('file'), (req,res)=>{
 Cloudinary.uploader.upload('./uploads/'+req.file.filename , (result)=>{
     console.log(">>> this is the result of upload" , result);
     res.send({
         "imageUrl":result.secure_url
     });
 })
})

server.listen(process.env.PORT||5000 , ()=>{
    console.log("server is running");
})