import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from 'react'
import './App.css'
import landing from "./Views/landing/landing";
import Home from "./Views/home/home";
import detail from "./Views/detail/detail";
import form from "./Views/form/form";

function App() {
  

  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={landing}/>
        <Route path="/home" Component={Home}/>
        <Route path="/detail:id" Component={detail}/>
        <Route path="/form" Component={form}/>
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
