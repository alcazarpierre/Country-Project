const {Op, Country, Activity} = require ("../db.js");

const getAllActivities = async () => {
    return await Activity.findAll()
};

const createActivity = async (name, difficulty, time_to, season) => {
    return await Activity.create({
        name,
        difficulty,
        time_to,
        season,
    });
    
}

const associateCountries = async (id) =>{
    return await Country.findOne({
        where: { id: id }
    });
}

module.exports = {getAllActivities, createActivity, associateCountries};