import React from "react";
import style from "./Landing.module.css";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Landing() {
  const dispatch = useDispatch();

  const handleTravelTogetherClick = () => {
    dispatch(clearFilters());
  };

  return (
    <div className={style.background}>
      <h1 className={style.h1}>Bienvenido al Tour Mundial!</h1>
      <Link to="/home" onClick={handleTravelTogetherClick}>
        <button className={style.button}>Viajemos Juntos!</button>
      </Link>
    </div>
  );
}

export default Landing;