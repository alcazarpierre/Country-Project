const {Op, Country, Activity} = require ("../db.js");


const createActivity = async (name, difficulty, time_to, season, countries) => {
    
    if (!name || !difficulty || !time_to ||!season || !countries) {
        throw new Error("No se llenaron todos los campos obligatorios");
    } else {

        let arrayOfCountries = []; 

        for (const country of countries) {
            let addCountry = await Country.findByPk(country);
            if (!addCountry) {
                throw new Error(`No se encontró el pais con el ID: ${country} .`);
            }
            arrayOfCountries.push(addCountry); 
        }

        const activity = { 
            name,
            difficulty,
            time_to,
            season
        };

        const newActivity = await Activity.create(activity);

        await newActivity.setCountries(arrayOfCountries); 

        return newActivity;
    }
};

const getAllActivities = async () => {
    return await Activity.findAll();
};

module.exports = {getAllActivities, createActivity};