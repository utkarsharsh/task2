import { useState } from 'react'
import reactLogo from './assets/react.svg'
import face1 from './assets/face1.jpg'
import Member from './components/Member.jsx'
import Totalmember from './components/Totalmember.jsx'
import Camera from './components/opencamera.jsx'
import {useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import axios from 'axios'









function App() {
  const [count, setCount] = useState("1");
  const [cam,nocam]=useState(false);
const [totaldata,settotaldata]=useState([[{
  
}]]);

const [currentdata,setcurrentdata]=useState([{
  
}]);

  function handleclick(){
  nocam(true);

}




 let ans=localStorage.getItem('token');

 async function  api (){
  let token2="";
   await axios.get('http://localhost/home', {
    
        headers:{
         authorization: "Bearer "+ans 
         
        }
       
        
       }
       

   ).then((response)=>{

    if(response.data=="nobro"){
      setCount("1");
         }
         else {
          setCount("0");
console.log(response.data);
setcurrentdata(
  (response.data.currentusers)
)
settotaldata((pre)=>{
  return([...pre,...response.data.totalusers]);
})

         }
   })

   

   
  
   
 }
 console.log(currentdata);
   console.log(totaldata);
  //useeffect
   useEffect( ()=>{
   
   api();
   


   }, [])



if(count=="0"){

  return (
    <>
      <div className='navbar'>
<div className="mainlogo">
<img src="https://cdn.dribbble.com/users/1679879/screenshots/3903645/linkface.gif" alt="" />
</div>
<div className="mainprofile"> 


<div className="mainroll">
    <div className="mainicon">
<img src={currentdata.imageurl} id="userpic"/>   
</div>

<p>{currentdata.name}</p>
<div > </div>
</div></div>
      </div>
<div className='mid'>
  
<div className='dialogs'>
<h1>

Mark your attendance

</h1>
<p1>
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum voluptas deserunt quisquam! Reprehenderit quos est saepe earum tempore, minima porro voluptates illum facere debitis, eveniet eos quaerat accusantium rem veritatis.
</p1>
</div>
<div className='frontimage'>
<img src="https://static.wixstatic.com/media/041823_83f1aef0a9284bfe97370ae3ac12baa0~mv2.png/v1/crop/x_0,y_43,w_507,h_593/fill/w_412,h_480,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Mask%20Group.png" />
</div>


</div>

<div className="camera">
<div className="camerapic" 
>
<h1>click and mark present</h1>
<img src="https://cdn-icons-png.flaticon.com/512/3687/3687416.png" onClick={handleclick} ></img>

</div>
<div className="allpresent">
  <h2>Total users</h2>
  { totaldata.map((e)=>{
        return (<Totalmember name={e.name} imageurl={e.imageurl}/>)




    })}
  
</div>
<div className="present">
  <h2>Present users</h2>
  <Member/>
</div>

</div>

<div style={ cam ? {display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',marginTop:'34px'}: {display   : "none"}}>
<Camera  prop={nocam}/>
</div>

        
    </>
  )
}
else{
  return( <>wait or check connection</>);
}}
export default App
