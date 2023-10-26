import React from 'react'
import axios from "axios";
import validations from "./validation"
import { getCountries } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import style from "./form.module.css"

const form = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate(); //cada vez que creo una actividad me devuelve al form

  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    time_to: "",
    season: "",
    countries: [],
    countrySearch: "",
    searchResults: [],
  });


  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const [errors, setErrors] = useState({});

  useEffect(() => {// un use effect para validar los errores, 
    setErrors(validations(activity)); //porque sino quedan desfasados y no perimite crear la actividad
  }, [activity]);

  const [selectedCountry, setSelectedCountry] = useState(null);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setActivity((prevData) => ({ //le paso al estado de las actividades los nuevos valores ingresados 
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountrySearch = (event) => {
    const countrySearched = event.target.value.toLowerCase();
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(countrySearched)
    );

    // Excluye los países que ya están seleccionados
    const availableCountries = filteredCountries.filter(
      (country) => !activity.countries.includes(country.id)
    );

    setActivity({
      ...activity,
      countrySearch: event.target.value,
      searchResults: availableCountries,
    });
  };

  const handleAddCountry = (country) => {
    if (!activity.countries.includes(country.name)) {
      setActivity((prevData) => ({
        ...prevData,
        countrySearch: "", //una vez que voy a agregar la actividad, devuelvo
        searchResults: [], //los estados a su origen
        countries: [...prevData.countries, country.name]
      }));

      setSelectedCountry(country.name); //guardo el estado local con los paises relacionados a la actividad
    }
  };

  const handleRemoveCountry = (country) => {
    setActivity((prevData) => ({
      ...prevData,
      countries: prevData.countries.filter((c) => c !== country),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //esto evita que se recarge la página por el evento submit

    // Convertir el array de nombres de países a un array de IDs de países
    const countriesIdsArray = activity.countries.map((countryName) => {//para pasarle a la BD el id del país y que lo relacione
      const country = countries.find((c) => c.name === countryName); // en la tabla intermedia
      return country ? country.id : null;
    });

    const activityData = { //le paso los datos con los de la actividad
      name: activity.name,
      difficulty: activity.difficulty,
      time_to: activity.time_to,
      season: activity.season,
      countries: countriesIdsArray //con los id de los países para uqe haga la relacion
    };

    console.log(activityData);

    axios
      .post("http://localhost:3001/activities/form", activityData)
      .then((res) => {
        console.log("Response from server:", res.data);
        const confirmed = window.confirm("Confirma la creación?");
        if(confirmed){
          alert("Actividad creada con Exito!");
          navigate("/home");
        }
  
      })
      .catch((error) => {
        console.error("Hubo un error:", error.response.data);
    
        alert(`Hubo un error, actualice e intente nuevamente.`);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={style.formContainer}> {/*el handle submit es para cuando se crea una actividad*/}
      <div>
      <Link to={`/home`}>
          <button>Volver</button>
      </Link>
      </div>
      <h2 className={style.title}>Aquí puedes crear una actividad</h2>
      <div className={style.formContent}>
        <div className={style.formField}>
          <label>Nombre de la actividad: </label>
          <input
            type="text"
            name="name"
            value={activity.name}
            onChange={changeHandler}
          />
          {errors.name && (
            <span className={style.formError}>{errors.name}</span>
          )}
        </div>
        <div className={style.formField}>
          <label>Dificultad: </label>
          <input
            type="number"
            name="difficulty"
            value={activity.difficulty}
            onChange={changeHandler}
            placeholder="Nivel de dificultad del 1 al 5"
          />
          {errors.difficulty && (
            <span className={style.formError}>{errors.difficulty}</span>
          )}
        </div>

        <div className={style.formField}>
          <label>Duración: </label>
          <input
            type="number"
            name="time_to"
            value={activity.time_to}
            onChange={changeHandler}
            placeholder="Ingrese el tiempo en horas"
          />
          {errors.countries && (
            <span className={style.formError}>{errors.duration}</span>
          )}
        </div>
        <div>
          <label>Temporada: </label>
          <select
            name="season"
            value={activity.season}
            onChange={changeHandler}
          >
            <option value="" disabled>
              Seleccione:
            </option>
            <option value="Verano">Verano</option>
            <option value="Otono">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
          {errors.season && (
            <span className={style.formError}>{errors.season}</span>
          )}
        </div>

        <div className={style.formField}>
          <label>Paises: </label>
          <div className={style.formCountrySearch}>
            <input
              type="text"
              name="countries"
              value={activity.countrySearch}
              onChange={handleCountrySearch}
              placeholder="Ingrese un pais"
            />
            {errors.countries && (
              <span className={style.formError}>{errors.countries}</span>
            )}
            <div className={style.searchResults}>
              {activity.searchResults.map((country) => ( //mapeo los países para buscarlos y que me vaya mostrando las opciones
                <div
                  key={country.name}
                  className={`${style.searchResultItem} ${
                    selectedCountry === country.name ? style.selectedCountry : ""
                  }`}
                  onClick={() => handleAddCountry(country)}
                >
                  {country.name} {/*me muestra el país seleccionado*/}
                  {activity.countries.includes(country.name) && (
                    <span className={style.addedIndicator}>Added</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={style.countryCointeiner}>
            {activity.countries.map((country) => (
              <div key={country} className={style.countrySelected}>
                <span>{country}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCountry(country)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          {activity.name && //solo si se completan todos los campos requeridos 
          activity.difficulty && //se habilita el botón para crear la actividad
          activity.season &&
          activity.countries.length > 0 &&
          Object.keys(errors).length === 0 ? (
            <button className={style.formButton}>Crear la Actividad!</button>
          ) : (
            <button className={style.formButton} disabled>
              Algunos campos están incompletos
            </button>
          )}
        </div>
      </div>
      
      
    </form>
  );
};

export default form