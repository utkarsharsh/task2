import express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'; 
import jwt from 'jsonwebtoken';
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
// import fileUpload from 'express-fileupload'
const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config(); 

//cloudnary config..
cloudinary.config({ 
    cloud_name: 'disggmk1g', 
    api_key: process.env.apikey, 
    api_secret: process.env.apisecret,
  });
      //




// app.use(fileUpload());

mongoose.connect('mongodb://127.0.0.1:27017/test',);
const kittySchema = new mongoose.Schema({

    name: String,
    password: String,
    imageurl:String,
  });

//multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
       
        console.log(file);
        cb(null, file.originalname + '-' + Date.now());
    }
});

var upload = multer({ storage: storage });






  const jwtSecretKey=process.env.SECRETKEY;

const userinfo = mongoose.model("userinfo",kittySchema);



app.get("/",(req,res)=>{
    res.render('index.ejs');

})
app.get("/login",(req,res)=>{
    res.render('login.ejs');

});

let a={};
// regiter


app.post("/submit",upload.single('image'), async(req,res)=>{
   
 

 var a=req.file.originalname + '-' + Date.now();
 



 



// bycrption
if(req.body.password!=null){
bcrypt.genSalt(10,  async function(err, salt) {
    bcrypt.hash(req.body.password, salt, async function(err, hash) {
if(err){
    console.log(err);
}
else{

  let p=  await userinfo.findOne({name:req.body.name});
  
  if(p!=null){ 
    res.send("<h1>kya kar diya bhai</h1>");
  }
  else{
    let profileurl="";
   // cloudnary is here...
   
         await cloudinary.uploader.upload(req.file.path,
        { public_id:req.body.name },function(error,result){
            profileurl=result.url;
        })
        
       
       
       //
       console.log(profileurl);

        const user = new userinfo({
            name:req.body.name,
        password:hash,
imageurl:profileurl,
    });
      await  user.save();
      console.log(user);

      const jwtSecretKey=process.env.SECRETKEY;
      const token = jwt.sign({
        id:user._id,
      }, jwtSecretKey); 
      
      


      
        res.send(token);
        }
}
    })}
    );
}
else{
    res.send("enter password");
}

});

    // login 
    app.post("/login",async (req,res)=>{
        
  const userpassword= await userinfo.findOne({name : req.body.name});
 console.log(userpassword);
  bcrypt.compare(req.body.password,userpassword.password, function(err, response) {

    if(response){
        const jwtSecretKey=process.env.SECRETKEY;
        const token =  jwt.sign({
          id:userpassword._id,
        }, jwtSecretKey); 
        res.send(token);
        
    }
    else {
        console.log("not match");
    }
});

    });
    

       
    


    

app.get("/home",(req,res)=>{
    console.log(req.headers);
    let token=req.headers.authorization;
token=token.split(" ");
    const verified = jwt.verify(token[1], jwtSecretKey); 
    if(verified){

        res.send("succesfull ");
    }
    else{
        res.send("unsuccesfull");
    }
});

app.listen(80,(err)=>{
    console.log(err);
});
