const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;


//******************************************* */
// //version original con promesas then y catch:

// conn.sync({ force: true }).then(() => {
// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// })
// }).catch(error => console.error(error))
//******************************************** */

//Versión async/await:

async function startServer() {
  try {
    await conn.sync({ force: true});  //setear en true durante la fase de desarrollo y pruebas para forzar la eliminacion de todas las tablas y creacion de nuevas, en la fase de produccion o deploy, mantenerlo en false.
    console.log (`Base de Datos sincronizada`);
    server.listen (PORT, () => {
      console.log(`Servidor escuchando en el puerto: ${PORT}`);
    });
    
  } catch (error) {
    console.error (`Error inicializando el Servidor: `, error);
  }
 };

 startServer();