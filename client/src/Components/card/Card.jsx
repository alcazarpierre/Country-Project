import React from 'react'
import { Link } from "react-router-dom";
import style from "./card.module.css"

//Recibimos por props los atributos del Country para diseñar nuestro componente Card
const Card = (country) => {
  const { id, name, flag_image, continent } = country;
  return (
    <div className={style.container}>
      <img className={style.cardImage} src={flag_image} alt={name} />
      <div className={style.contentContainer}>
        <h2 className={style.title}>{name}</h2>
        <h3 className={style.continent}>{continent}</h3>
        <Link to={`/detail/${id}`}>
          <button>➕</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;