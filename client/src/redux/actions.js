import axios from "axios";
import {
  SET_ORDER,
  SET_FILTER_CONTINENT,
  SET_FILTER_ACTIVITY,
  COMBINED_FILTERS,
  GET_COUNTRIES,
  GET_ACTIVITIES,
  SEARCH_COUNTRY,
  CLEAR_FILTERS
} from "./actions-types.js";

const ENDPOINT = "http://localhost:3001";


export const setOrder = (order) => {
  return { type: SET_ORDER, payload: order };
};

export const setFilterContinent = (continent) => {
  return { type: SET_FILTER_CONTINENT, payload: continent };
};

export const setFilterActivity = (activity) => {
  return { type: SET_FILTER_ACTIVITY, payload: activity };
};


export const getCountries = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${ENDPOINT}/countries`);

            if(!data) throw Error('The countries were not found, check the database');

            return dispatch({
                type: GET_COUNTRIES,
                payload: data,
            })
        } catch (error) {
            alert(error.message);
        }
    }
};

export const getActivities = () => {
    return async function (dispatch) {
      try {
        const { data } = await axios.get(`${ENDPOINT}/activities`);
        
        return dispatch({
          type: GET_ACTIVITIES,
          payload: data
        });
      } catch (error) {
        alert(error.message);
      }
    };
  };

  
  export const searchCountry = (name) => {
  return async function (dispatch) {
    try {
      const { data }  = await axios.get(
        `${ENDPOINT}/countries?name=${name}`
        );
        return dispatch({
        type: SEARCH_COUNTRY,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const clearFilters = () => {
  return { type: CLEAR_FILTERS};
};

export const combinedFilters = (order, continent, activity) => {

  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${ENDPOINT}/countries`);

      let filterCountries = data;

      //Si solo selecciona el ordenamiento:
      if (order && !continent && !activity) {
        switch (order) {
          case "":
            
            break;
          case "asc":
            filterCountries.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "desc":
            filterCountries.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "lowerPop":
            filterCountries.sort((a, b) => a.population - b.population);
            break;
          case "higherPop":
            filterCountries.sort((a, b) => b.population - a.population);
            break;
          default:
        }
      
      //Si solo se filtra por continente:
      } else if (!order && continent && !activity) {
        filterCountries = filterCountries.filter(
          (country) => country.continent === continent
        );

      //Si solo se filtra por actividad:
      } else if (!order && !continent && activity) {
        if(activity === "") filterCountries
        else{
          filterCountries = filterCountries.filter((country) =>
            country.Activities.some((act) => act.name === activity)//some=si al menos un elemento cumple
          );
        }

      //Si se selecciona Orden y Continentes:
      } else if (order && continent && !activity) {
        filterCountries = filterCountries.filter(
          (country) => country.continent === continent
        );
        switch (order) {
          case "":
            
            break;
          case "asc":
            filterCountries.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "desc":
            filterCountries.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "lowerPop":
            filterCountries.sort((a, b) => a.population - b.population);
            break;
          case "higherPop":
            filterCountries.sort((a, b) => b.population - a.population);
            break;
          default:
        }
      
      //Si se selecciona Orden y Actividad:
      } else if (order && !continent && activity) {
        if(activity === "") filterCountries;
        else{
          filterCountries = filterCountries.filter((country) =>
            country.Activities.some((act) => act.name === activity)
          );
        }
        
        switch (order) {
          case "":
            break;
          case "asc":
            filterCountries.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "desc":
            filterCountries.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "lowerPop":
            filterCountries.sort((a, b) => a.population - b.population);
            break;
          case "higherPop":
            filterCountries.sort((a, b) => b.population - a.population);
            break;
          default:
        }

      //Si se selecciona Continente y Actividad:
      } else if (!order && continent && activity) {
        filterCountries = filterCountries.filter(
          (country) => country.continent === continent
        );
        if(activity === "") filterCountries;
        else{
          filterCountries = filterCountries.filter((country) =>
            country.Activities.some((act) => act.name === activity)
          );
        }

      //Si se seleccionan los tres filtros:
      } else if (order && continent && activity) {
        filterCountries = filterCountries.filter(
          (country) => country.continent === continent
        );
        if(activity === "") filterCountries;
        else{
          filterCountries = filterCountries.filter((country) =>
            country.Activities.some((act) => act.name === activity)
          );
        }
        switch (order) {
          case "":
            // No se realiza ninguna operación
            break;
          case "asc":
            filterCountries.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "desc":
            filterCountries.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "lowerPop":
            filterCountries.sort((a, b) => a.population - b.population);
            break;
          case "higherPop":
            filterCountries.sort((a, b) => b.population - a.population);
            break;
          default:
            // En caso de un valor inesperado en 'order', no se realiza ninguna operación

        }
      }

      return dispatch({ type: COMBINED_FILTERS, payload: filterCountries });
    } catch (error) {
      alert("Error fetching data:", error);
    }
  };
};