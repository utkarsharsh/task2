import { useState } from 'react'
import reactLogo from './assets/react.svg'
import face1 from './assets/face1.jpg'
import Member from './components/Member.jsx'
import Totalmember from './components/Totalmember.jsx'
import Camera from './components/opencamera.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [cam,nocam]=useState(false);
  function handleclick(){
  nocam(true);

}

  return (
    <>
      <div className='navbar'>
<div className="mainlogo">
<img src="https://cdn.dribbble.com/users/1679879/screenshots/3903645/linkface.gif" alt="" />
</div>
<div className="mainprofile"> 


<div className="mainroll">
    <div className="mainicon">
<img src="data:image/png;base64,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" id="userpic"/>   
</div>

<p>Utkarsh upadhyay</p>
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
  <Totalmember/>
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

export default App
