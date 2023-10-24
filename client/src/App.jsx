import {Routes, Route, useLocation} from "react-router-dom";
import landing from "./Views/landing/landing";
import Home from "./Views/home/home";
import detail from "./Views/detail/detail";
import form from "./Views/form/form";
import NavBar from "./Components/navbar/NavBar";

import './App.css'

function App() {
  
const location = useLocation();

  return (
   <div>

  {location.pathname !== "/" && location.pathname !== "/form" && <NavBar/>}    

      <Routes>
        <Route path="/" Component={landing}/>
        <Route path="/home" Component={Home}/>
        <Route path="/detail/:id" Component={detail}/>
        <Route path="/form" Component={form}/>
      </Routes>
   </div>
  )
}

export default App
