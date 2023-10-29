import express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'; 
import jwt from 'jsonwebtoken';
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import  cors  from 'cors';


// import fileUpload from 'express-fileupload'
const app=express();
app.use(cors());
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
try{
 await mongoose.connect('mongodb+srv://harshupadhyay7786:mnbvcxz@cluster0.ypptwdf.mongodb.net/test2');}
catch (err){
console.log(err);
}
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
   
 let a="";
 console.log(req.body);
// if(req.body.image ){
//   a=req.file.originalname + '-' + Date.now();
// }
// else{
//     res.send("202");
// }



 



// bycrption
if(req.body.password != '' &&  req.body.image!='' && req.body.name!=''){
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
        { public_id:req.body.name },function  (error,result){
            console.log(result);
            profileurl=result.url;
        });
        
       
       
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
    res.status(404).send("what?");
}

});

    // login 
    app.post("/login",async (req,res)=>{
        console.log(req.body);
        if(req.body.password=="" || req.body.name=="" ){
            res.status(404).send("nogood");
        }
        else{
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
        res.status(404).send("nogood");
    }
});
        }
    });
    

  let totaluser= await    userinfo.find();
    // console.log(totaluser);


    

app.get("/home", async (req,res)=>{
    console.log(req.headers);
    let token=req.headers.authorization;

console.log(token);
if(token=="Bearer abcc"){
    res.send("nobro");
    console.log("m");
}
else{
    token=token.split(" ");
    const verified = jwt.verify(token[1], jwtSecretKey); 
    let currentuser= await userinfo.findOne({_id: verified.id})
    if(verified){

        res.send({
            totalusers:totaluser,
            currentusers :currentuser

        });
    }
    else{
        res.send(
           "nobro"  );
    }}
});

app.listen(80,(err)=>{
    console.log(err);
});
