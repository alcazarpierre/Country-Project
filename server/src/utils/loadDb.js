const { Country } = require('../db');
const axios = require('axios');
const endPoint = 'http://localhost:5000/countries';


//Con esta función getCountryApiInfo conseguimos la informacion de countries de nuestra db local:

const getContryApiInfo = async () => {
    const response = await axios.get(endPoint);
    const map = response.data.map(info => {
        const country = {
            id: info.cca3,
            name: info.name.common,
            flag_image: info.flags.svg,
            continent: info.continents[0],
            capital: info.capital != null ? info.capital[0] : 'No data', //existen varias filas con este campo vacio.
            subregion: info.subregion,
            area: info.area,
            population: info.population,
        };
        return country;
    });
    return map;
};

//Con esta función apiInfoToDB cargamos la informacion a nuestra DB:

const apiInfoToDB = async() => {
    try {
        const countries = await Country.findAll();
        if (!countries.length){
            const info = await getContryApiInfo();
            await Country.bulkCreate(info);
        }
    } catch (error) {
        console.log (error);
    }
};

//Cargamos la info de la API local a la DB cuando el servidor se inicializa:

const loadInfo = async () =>{
    await apiInfoToDB();
    console.log("Cargando datos de Api Local");
};

module.exports ={loadInfo};