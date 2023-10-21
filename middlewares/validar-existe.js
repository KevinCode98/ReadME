const { response } = require('express');
const alarmasDB = require('../querys/alarmas');
const alumnosDB = require('../querys/alumnos');
const asignacionesDB = require('../querys/asignaciones');
const autoresDB = require('../querys/autores');
const corrientesDB = require('../querys/corrientes');
const lecturasDB = require('../querys/lecturas');
const nacionalidadesDB = require('../querys/nacionalidades');
const opcionesDB = require('../querys/opciones');
const preguntasDB = require('../querys/preguntas');
const profesoresDB = require('../querys/profesores');
const puntuacionesDB = require('../querys/puntuaciones');
const respuestasDB = require('../querys/respuestas');
const questionariosDB = require('../querys/questionarios');
const salasDB = require('../querys/salas');
const tematicasDB = require('../querys/tematicas');
const usuariosDB = require('../querys/usuarios');

const existeAlarma = async (req, res = response, next) => {
  const id = req.body.id_alarma ? req.body.id_alarma : req.params.id;
  if (!(await alarmasDB.getAlarma(id)))
    return res.status(400).json({
      msg: 'El Alarma no existe en la base de datos',
    });
  next();
};

const existeAlumno = async (req, res = response, next) => {
  const id = req.usuario ? req.usuario.ID_USUARIO : req.params.id;
  if (!(await alumnosDB.getAlumno(id)))
    return res.status(400).json({
      msg: 'El Alumno no existe en la base de datos',
    });
  next();
};

const existeAsignacion = async (req, res = response, next) => {
  const id = req.body.id_asignacion ? req.body.id_asignacion : req.params.id;
  if (!(await asignacionesDB.getAsignacion(id)))
    return res.status(400).json({
      msg: 'La Asignacion no existe en la base de datos',
    });
  next();
};

const existeAutor = async (req, res = response, next) => {
  const id = req.body.id_autor ? req.body.id_autor : req.params.id;
  if (!(await autoresDB.getAutor(id)))
    return res.status(400).json({
      msg: 'El Autor no existe en la base de datos',
    });
  next();
};

const existeCorriente = async (req, res = response, next) => {
  const id = req.body.corriente_literaria
    ? req.body.corriente_literaria
    : req.params.id;
  if (!(await corrientesDB.getCorriente(id)))
    return res.status(400).json({
      msg: 'La Corriente Literaria no existe en la base de datos',
    });
  next();
};

const existeLectura = async (req, res = response, next) => {
  const id = req.body.id_lectura ? req.body.id_lectura : req.params.id;
  if (!(await lecturasDB.getLectura(id)))
    return res.status(400).json({
      msg: 'La Lectura no existe en la base de datos',
    });
  next();
};

const existeNacionalidad = async (req, res = response, next) => {
  const id = req.body.nacionalidad ? req.body.nacionalidad : req.params.id;
  if (id === null) next();
  if (!(await nacionalidadesDB.getNacionalidad(id)))
    return res.status(400).json({
      msg: 'La Nacionalidad no existe en la base de datos',
    });
  next();
};

const existeOpcion = async (req, res = response, next) => {
  const id = req.body.id_opcion ? req.body.id_opcion : req.params.id;
  if (!(await opcionesDB.getOpcion(id)))
    return res.status(400).json({
      msg: 'La Opcion no existe en la base de datos',
    });
  next();
};

const existePregunta = async (req, res = response, next) => {
  const id = req.body.id_pregunta ? req.body.id_pregunta : req.params.id;
  if (!(await preguntasDB.getPregunta(id)))
    return res.status(400).json({
      msg: 'La Pregunta no existe en la base de datos',
    });
  next();
};

const existeProfesor = async (req, res = response, next) => {
  const id = req.usuario ? req.usuario.ID_USUARIO : req.params.id;
  if (!(await profesoresDB.getProfesor(id)))
    return res.status(400).json({
      msg: 'El Profesor no existe en la base de datos',
    });
  next();
};

const existeProgreso = async (req, res = response, next) => {
  const id = req.body.id_progreso ? req.body.id_progreso : req.params.id;
  if (!(await puntuacionesDB.getPuntuacion(id)))
    return res.status(400).json({
      msg: 'El progreso no existe en la base de datos',
    });
  next();
};

const existePuntuacion = async (req, res = response, next) => {
  const id = req.body.id_puntuacion ? req.body.id_puntuacion : req.params.id;
  if (!(await puntuacionesDB.getPuntuacion(id)))
    return res.status(400).json({
      msg: 'La Puntuaciones no existe en la base de datos',
    });
  next();
};

const existeRespuesta = async (req, res = response, next) => {
  const id = req.body.id_respuesta ? req.body.id_respuesta : req.params.id;
  if (!(await respuestasDB.getRespuesta(id)))
    return res.status(400).json({
      msg: 'La Respuesta no existe en la base de datos',
    });
  next();
};

const existeQuestionario = async (req, res = response, next) => {
  const id = req.body.id_questionario
    ? req.body.id_questionario
    : req.params.id;
  if (!(await questionariosDB.getQuestionario(id)))
    return res.status(400).json({
      msg: 'El Questionario no existe en la base de datos',
    });
  next();
};

const existeSala = async (req, res = response, next) => {
  const id = req.params.id ? req.params.id : req.body.id_sala;
  if (!(await salasDB.getSala(id)))
    return res.status(400).json({
      msg: 'La Sala no existe en la base de datos',
    });
  next();
};

const existeTematica = async (req, res = response, next) => {
  const id = req.body.tematica ? req.body.tematica : req.params.id;
  if (!(await tematicasDB.getTematica(id)))
    return res.status(400).json({
      msg: 'La Tematica no existe en la base de datos',
    });
  next();
};

const existeUsuario = async (req, res = response, next) => {
  const id = req.usuario ? req.usuario.ID_USUARIO : req.params.id;
  if (!(await usuariosDB.getUsuarioOnline(id)))
    return res.status(400).json({
      msg: 'El Usuario no existe en la base de datos',
    });
  next();
};

module.exports = {
  existeAlarma,
  existeAlumno,
  existeAsignacion,
  existeAutor,
  existeCorriente,
  existeLectura,
  existeNacionalidad,
  existeOpcion,
  existePregunta,
  existeProfesor,
  existeProgreso,
  existePuntuacion,
  existeQuestionario,
  existeRespuesta,
  existeSala,
  existeTematica,
  existeUsuario,
};
