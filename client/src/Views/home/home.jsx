import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/cards/Cards";
import Paginated from '../../Components/Paginated/Paginated';
import style from "./home.module.css"

import {getCountries, 
        getActivities, 
        setOrder, 
        setFilterContinent, 
        setFilterActivity, 
        combinedFilters } from '../../redux/actions';


const Home = () => {
  const dispatch = useDispatch();

  //Selección de datos desde el Estado Global de Redux (reducer):
  const order = useSelector((state) => state.order);
  const filterContinent = useSelector((state) => state.filterContinent);
  const filterActivity = useSelector((state) => state.filterActivity);
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  //Estado local para la página actual, inicia en (1) primera página:
  const [currentPage, setCurrentPage] = useState(1);

  //Cantidad de paises por página (10) e acuerdo al Readme:
  const [countriesPerPage, setCountriesPerPage] = useState(10);

  //Acá hacemos el cálculo de índices para la paginación:
  const indexOfLastCountry = currentPage * countriesPerPage; //Indice del ultimo pais/pagina
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; //Indice del primer pais/pagina

  //Extraemos en un array los paises a mostrar con el método Slice (inicioIncluido, ultimoExcluido):
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
 
  //Funcion para cambiar la página actual:
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //usamos el Hook de useEffect para cargar los paises cuando se carga la pagina
  useEffect(() => {
    dispatch(getCountries()); 
  }, [dispatch]);
  
  //
  useEffect(() => {
    dispatch(getActivities()); 
    //Si cualquiera de las variables es verdadera, ejecutará la action 
    //combinedFilters para aplicar los filtros:
    if (order || filterContinent || filterActivity){
      dispatch(
        combinedFilters(order, filterContinent, filterActivity)
        ); 
    }
  }, [order, filterContinent, filterActivity]);

  //HANDLERS: luego de aplicar el filtro seleccionado,
  //devuelve a la pagina 1

  const orderedCountriesHandler = (event) => {
    dispatch(setOrder(event.target.value)); 
    setCurrentPage(1);
  };

  const filteredContinentHandler = (event) => {
    dispatch(setFilterContinent(event.target.value));
    setCurrentPage(1);
  };

  const filteredActivityHandler = (event) => {
    dispatch(setFilterActivity(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <div>
        <small className={style.small}>  Ordenar: </small>
        <select
          onChange={(event) => orderedCountriesHandler(event)} 
          className={style.select}
        >
          <option value="">None</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
          <option value="higherPop">Mayor Población</option>
          <option value="lowerPop">Menor Población</option>
        </select>

        <small className={style.small}>  Selecciona Continente: </small>
        <select
          onChange={(event) => filteredContinentHandler(event)}
          className={style.select}
        >
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="North America">America del Norte</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">America del Sur</option>
        </select>

        <small className={style.small}>  Actividades: </small>
        <select
          onChange={(event) => filteredActivityHandler(event)}
          className={style.select}
        >
          <option value="">None</option>
          {activities?.map((activity) => (
            <option value={activity.name} key={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>

      {/* Utilizamos el ternario, enviamos el arreglo de 10 paises por props a Cards 
      y si no hay paises que mostrar, mostramos el mensaje h1: */}
      { currentCountries.length > 0 ? ( 
        <Cards currentCountries={currentCountries} />
        ) : (
        <h1 className={style.noCounty}>
          No se encontraron paises que mostrar con los filtros.
        </h1>
      )}

      {/* Enviamos por props los valores al componente Paginated: */}
      <div className={style.fixedPaginated}>
        <Paginated
          countriesPerPage={countriesPerPage}
          countries={countries.length}
          paginated={paginated}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
 };

export default Home