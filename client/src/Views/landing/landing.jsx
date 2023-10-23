import React from 'react'
import style from "./landing.module.css"
import {Link} from "react-router-dom" 


const landing = () => {
  return (
    <div className={style.landingContainer}>

      <h1 className= {style.title}>Bienvenido al Tour Mundial</h1>
      <h3>Todos los continentes</h3>
      <p>Todos los paises y miles de destinos turísticos y sus principales atractivose en una sola App.</p>
      <p>Planifica tu viaje por paises y continentes</p>
    
      <Link to="../home/home.jsx" className={style.botonIngresar}>Ingresar</Link>

    </div>
  )
}

export default landing