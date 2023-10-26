import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "./detail.module.css"

const detail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:3001/countries/${id}`);
        const data = response.data;
        if (data.id) {
          setCountry(data);
        } else {
          window.alert("No se puede mostrar el Detalle");
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    };

    fetchData();

    return () => setCountry({});
  }, [id]);

  useEffect(() => {
    setCountry({}); 
  }, [id]);

  return (
   
    // </div>
        <div className={style.container}>
        
        {/* Titulo */}
        <h2 className={style.title}>Detalles del País</h2>
        <div className={`${style.detailContainer}  ${style.fadeIn}`}>
          {/* Bandera */}
          <img src={country?.flag_image} alt="Imagen no disponible" className={style.imgFlag} />
          <div className={style.detailsSection}>
            {/* Detalles */}
            <h2 className={style.detailsTitle}>{country?.name}</h2>
            <p className={style.detailItem}>{country?.continent}</p>
            <p className={style.detailItem}>{country?.id}</p>
            <p className={style.detailItem}>Capital: {country?.capital}</p>
            <p className={style.detailItem}>Región: {country?.subregion}</p>
            <p className={style.detailItem}>Área: {country?.area} km²</p>
            <p className={style.detailItem}>Población: {country?.population} Hab.</p>
          </div>
          <div className={style.activitiesSection}>
            {/* Actividades */}
            <h3 className={style.activitiesTitle}>Actividades del País</h3>
            {country?.Activities && country.Activities.length ? (
              country.Activities.map((e) => {
                return (
                  <div key={e.name}>
                    {/* Detalle de las actividades */}
                    <h4 className={style.detailItem}>{e.name}</h4>
                    <p className={style.activityDetail}>Dificultad: {e.difficulty}</p>
                    <p className={style.activityDetail}>Duración: {e.time_to} horas</p>
                    <p className={style.activityDetail}>Temporada: {e.season}</p>
                  </div>
                );
              })
            ) : (
              // Mensaje cuando no hay actividades
              <p className={style.detailItem}>No existen actividades en este país</p>
            )}
            {/* Boton para crear actividad */}
            <Link to="/form">
              <button className={style.button}>Crear Actividad</button>
            </Link>
          </div>
        </div>
      </div>

    );
  };

export default detail;