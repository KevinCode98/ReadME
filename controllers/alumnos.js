const { response, request } = require('express');
const alumnosDB = require('../querys/alumnos');
const { validationResult } = require('express-validator');

const alumnosGet = async (req, res = response) => {
  try {
    res.json(await alumnosDB.getAlumnos());
  } catch (error) {
    console.error(' Error en la petición de base de datos - alumnosGet');
  }
};

const alumnoGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await alumnosDB.getAlumno(id));
  } catch (error) {
    console.error('Error enl a petición de la base de datos - alumnoGet');
  }
};

const alumnoPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await alumnosDB.postAlumno(req.body));
  } catch (error) {
    console.error('Error en la petición de la base de datos - alumnoPost');
  }
};

module.exports = {
  alumnosGet,
  alumnoGet,
  alumnoPost,
};
