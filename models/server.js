const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

class Server {
  constructor() {
    this.conexion;
    this.app = express();
    this.port = process.env.PORT;

    // Path de rutas
    this.activacionesPath = '/api/activaciones';
    this.alarmasPath = '/api/alarmas';
    this.alumnosPath = '/api/alumnos';
    this.asignacionesPath = '/api/asignaciones';
    this.authPath = '/api/auth';
    this.autoresPath = '/api/autores';
    this.corrientesPath = '/api/corrientes';
    this.dispositivosPath = '/api/dispositivos';
    this.historialPath = '/api/historial';
    this.inscritosPath = '/api/inscritos';
    this.lecturasPath = '/api/lecturas';
    this.leidosPath = '/api/leidos';
    this.nacionalidadesPath = '/api/nacionalidades';
    this.opcionesPath = '/api/opciones';
    this.preguntasPath = '/api/preguntas';
    this.profesoresPath = '/api/profesores';
    this.progresosPath = '/api/progresos';
    this.puntuacionesPath = '/api/puntuaciones';
    this.questionariosPath = '/api/questionarios';
    this.respuestasPath = '/api/respuestas';
    this.salasPath = '/api/salas';
    this.tematicasPath = '/api/tematicas';
    this.tutoradosPath = '/api/tutorados';
    this.usuariosPath = '/api/usuarios';
    this.imagenesPath = '/perfil';

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

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.activacionesPath, require('../routes/activaciones'));
    this.app.use(this.alarmasPath, require('../routes/alarmas'));
    this.app.use(this.alumnosPath, require('../routes/alumnos'));
    this.app.use(this.asignacionesPath, require('../routes/asignaciones'));
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.autoresPath, require('../routes/autores'));
    this.app.use(this.corrientesPath, require('../routes/corrientes'));
    this.app.use(this.dispositivosPath, require('../routes/dispositivos'));
    this.app.use(this.historialPath, require('../routes/historial'));
    this.app.use(this.inscritosPath, require('../routes/inscritos'));
    this.app.use(this.lecturasPath, require('../routes/lecturas'));
    this.app.use(this.leidosPath, require('../routes/leidos'));
    this.app.use(this.nacionalidadesPath, require('../routes/nacionalidades'));
    this.app.use(this.opcionesPath, require('../routes/opciones'));
    this.app.use(this.preguntasPath, require('../routes/preguntas'));
    this.app.use(this.profesoresPath, require('../routes/profesores'));
    this.app.use(this.progresosPath, require('../routes/progresos'));
    this.app.use(this.puntuacionesPath, require('../routes/puntuaciones'));
    this.app.use(this.questionariosPath, require('../routes/questionarios'));
    this.app.use(this.respuestasPath, require('../routes/respuestas'));
    this.app.use(this.salasPath, require('../routes/salas'));
    this.app.use(this.tematicasPath, require('../routes/tematicas'));
    this.app.use(this.tutoradosPath, require('../routes/tutorados'));
    this.app.use(this.usuariosPath, require('../routes/usuario'));
    this.app.use(this.imagenesPath, express.static('imagenes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en: http://localhost:' + this.port);
    });
  }
}

module.exports = Server;
