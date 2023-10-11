const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
const routes = require("./routes/index");

server.use(morgan("dev"));

//Configuracion de límites de Carga para el posteo de Actividades:
server.use(express.json({limit: `2mb`}));

server.use(cors());
server.use(router);

server.use('/', routes);

//Manejo personalizado de errores:
server.use((err, req, res, next) => { 
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;
