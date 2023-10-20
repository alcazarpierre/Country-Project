const {getAllCountries, getCountryByName, getCountryById} = require("../controllers/countryControllers");

const getCountryHandler = async (req, res) => {
    const {name} = req.query;
    try {
      if (!name) {
        const allCountries = await getAllCountries()
          res.status(200).json(allCountries);

      } else {
        const countryByName = await getCountryByName(name);
        res.status(200).json(countryByName);
        } 
    } catch (error) {
      // res.status(500).json(error);
      // res.status(404).json({ error: 'No country was found' });
      res.status(400).json({error: error.message});
    }
  };

const getDetailHandler = async (req, res) => {
    const {idPais} = req.params;
    try {
      const countryById = await getCountryById(idPais);
      res.status(200).json(countryById);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

  
};

module.exports={
    getCountryHandler,
    getDetailHandler,
};