const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.conexion;
    this.app = express();
    this.port = process.env.PORT;

    // Path de rutas
    this.usuariosPath = '/api/usuarios';

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicacion
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parsea del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en: http://localhost:' + this.port);
    });
  }
}

module.exports = Server;
