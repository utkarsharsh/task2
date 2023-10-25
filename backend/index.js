import express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'; 
import jwt from 'jsonwebtoken';

const app=express();
dotenv.config(); 

mongoose.connect('mongodb://127.0.0.1:27017/test',);
const kittySchema = new mongoose.Schema({

    name: String,
    password: String,



  });
  const jwtSecretKey=process.env.SECRETKEY;
const userinfo = mongoose.model("userinfo",kittySchema);

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    res.render('index.ejs');

})
app.get("/login",(req,res)=>{
    res.render('login.ejs');

});

let a={};
// regiter

app.post("/submit", async(req,res)=>{
a=req.body;






bcrypt.genSalt(10,  async function(err, salt) {
    bcrypt.hash(a.password, salt, async function(err, hash) {
if(err){
    console.log(err);
}
else{

  let p=  await userinfo.findOne({name:req.body.name});
  console.log(p);
  if(p!=null){ 
    res.send("<h1>madarchod</h1>");
  }
  else{
        const user = new userinfo({
            name:a.username,
        password:hash });
      await  user.save();
      const jwtSecretKey=process.env.SECRETKEY;
      const token = jwt.sign({
        id:user._id,
      }, jwtSecretKey); 
      
      


      
        res.send(token);
        }
}
    })}
    );
});

    // login 
    app.post("/login",async (req,res)=>{
        
  const userpassword= await userinfo.findOne({name : req.body.email});
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
