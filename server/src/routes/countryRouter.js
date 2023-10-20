const {Router} = require("express");
const {getCountryHandler, getDetailHandler} =require("../handlers/countryHandler");
const countryRouter = Router();

countryRouter.get("/", getCountryHandler ); //Obtener los paises
countryRouter.get("/:idPais", getDetailHandler); //Obtener el detalle de pais por ID

module.exports = countryRouter;