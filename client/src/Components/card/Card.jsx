import React from 'react'
import style from "./card.module.css"

const Card = () => {
  return (
    <div className={style.cardContainer}>

        <img src="" alt="Imagen de la Bandera" />
        <h3>Nombre del Pais</h3>

        <h3>Continente</h3>
        <p>Poblacion</p>

        <button>mas información</button>

    </div>
  )
}

export default Card