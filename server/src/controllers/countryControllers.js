const {Op, Country, Activity} = require ("../db.js");

const getAllCountries = async () => {
      const findAllCountries = await Country.findAll({
        include: [{
          model: Activity,
          through: { attributes: [] }
        }]
      });
      if (!findAllCountries) throw Error("No se encontraron paises en la DB")
      return findAllCountries;
};

const getCountryByName = async (name) => {
      const findCountryByName = await Country.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: {
        model: Activity,
        attributes: ['name'],
        through: { attributes: [] }
        }
      });
      if(!findCountryByName[0]) throw Error ('No existe ningun pais con ese Name');
      return findCountryByName;
};

const getCountryById = async (idPais) => {
      const findCountryById =  await Country.findOne({
        where: { id: idPais.toUpperCase() },
        include: {
          model: Activity,
          attributes: ['name', 'difficulty', 'time_to', 'season'],
          through: { attributes: [] }
        }
      });
      if(!findCountryById) throw Error ('No existe ningun pais con ese ID');
      return findCountryById;
};

module.exports = {getAllCountries, getCountryByName, getCountryById};
