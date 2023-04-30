const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.conexion;
    this.app = express();
    this.port = process.env.PORT;

    // Path de rutas
    this.alumnosPath = '/api/alumnos';
    this.profesoresPath = '/api/profesores';
    this.usuariosPath = '/api/usuarios';
    this.tutoradosPath = '/api/tutorados';
    this.autoresPath = '/api/autores';

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
    this.app.use(this.alumnosPath, require('../routes/alumnos'));
    this.app.use(this.profesoresPath, require('../routes/profesores'));
    this.app.use(this.usuariosPath, require('../routes/usuario'));
    this.app.use(this.tutoradosPath, require('../routes/tutorados'));
    this.app.use(this.autoresPath, require('../routes/autores'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en: http://localhost:' + this.port);
    });
  }
}

module.exports = Server;
