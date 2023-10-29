import App from "./App"
import Login from "./component2/login"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function Appp(){

return(
<BrowserRouter>
<Routes>
  <Route path="/" element={<Login/> }  ></Route>
  <Route path="/m" element={<App/> }  ></Route>
</Routes>
</BrowserRouter>
)


}
export default Appp