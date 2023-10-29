
import { useState, useEffect } from "react";
import axios from "axios";
// import { useHistory } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.css'
function Login(){
const [v,setv]=useState("Sign in")
const [login,setlogin] =useState(true);
const [chancesa,setchancesa]=useState({
    name: "",
password:"",
image:"",
});



localStorage.setItem('token',"abcc");




function handlechanges(e){
    setchancesa ((pre)=>{
    return {
        ...pre,
       [e.target.name] :e.target.value
    }


})

}
function handlechangesb(e){
    console.log(e.target.files[0]);
    setchancesa ((pre)=>{
        return {
            ...pre,
           [e.target.name] :e.target.files[0]
        }
    
    
    })
    
    }

      async function  handleSubmita  (e) {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', chancesa.name);
        formData.append('password', chancesa.password);
        formData.append('image', chancesa.image);
     
console.log(chancesa);
let token="";
try{
 token= await axios.post('http://localhost/submit', formData);


}
catch(err){
    if(err){
        alert("something went wrong ");
    }
}
       console.log(token);
       let check= false;

if(token.status==200){
check=true;

}

      check ? navigate('/m'):navigate('/');

    //    return <Redirect to="/m" />
   
    
    
   
       



    }
  

const navigate = useNavigate();



   async function handleSubmitb (e) {
        e.preventDefault();
    
        const formDat = new FormData();
        formDat.append('name', chancesa.name);
        formDat.append('password', chancesa.password);
        let token="";
try{
 token= await axios.post('http://localhost/login', {'name':chancesa.name,'password':chancesa.password,
},{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
})
}
catch(err){
    if(err){
        alert("something went wrong ");
    }
}
       console.log(token);
       let check=false;
       if(token.status==200){
        localStorage.setItem('token',token.data);
check=true;
       }
       else{
        alert("check your entries ");
       }
      
    //    const history = useHistory();
    //    return (<Redirect to="/m" />)
    // history.push('/m');
   
   check ? navigate('/m'):navigate('/');
    
    
   
       


    }





function handlelogin(){


setlogin(false);
setv("Sign up")

}
function handlelogin2(){
    setv("Sign in")

    setlogin(true);
    
    }





return(
    <>
    <div class="container">
        <div class="form-box">
            <h1 id="title">{v}</h1>
            <form>

                <div class="input-group">

                <div class="input-field" className={login ? 'nothing' : 'something'}>
                        <i class="fa-solid fa-envelope" ></i>
                        <input type="file"  name="image" placeholder='choose profile pics' onChange={handlechangesb} files={chancesa.image}/>
                        </div>




                    <div class="input-field" id="namefield">
                        <i class="fa-solid fa-user"></i>
                        <input type="text" placeholder="Name"  />
                        </div>
                        <div class="input-field">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" placeholder="Email" id="email" name="name" onChange={handlechanges} value={chancesa.name}/>
                        </div>
                        <div class="input-field">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" placeholder="Password" id="password" name="password" onChange={handlechanges} value={chancesa.password}/>
                        </div>
                        
                    </div>
                    <div class="btn-field" id='somechanges'>
                      <button type="button" id="signupbtn" className={login ? 'nothing':'something'} onClick={handleSubmita}
                    >register</button>  
                      <button type="button" id="signinbtn2"  className={login ? 'something':'nothing'}   onClick={handleSubmitb}
                      >login in</button>  
                    </div>
                    <div class="btn-field" >
                      <button type="button" id="signupbtn3" onClick={handlelogin}
                    >Sign up</button>  
                      <button type="button" id="signinbtn4" class="disable" onClick={handlelogin2}>Sign in</button>  
                    </div>
            </form>
        </div>
    </div>
    
    
    </>




)

}
export default  Login