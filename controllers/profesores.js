const { response, request } = require('express');
const profesoresDB = require('../querys/profesores');
const { validationResult } = require('express-validator');

const profesoresGet = async (req, res = response) => {
  try {
    res.json(await profesoresDB.getProfesores());
  } catch (error) {
    console.error(' Error en la petición de base de datos');
  }
};

const profesorGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await profesoresDB.getProfesor(id));
  } catch (error) {
    console.error('Error en la petición de la base de datos');
  }
};

const profesorPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await profesoresDB.postProfesor(req.body));
  } catch (error) {
    console.error('Error en la petición de la base de datos');
  }
};

module.exports = {
  profesoresGet,
  profesorGet,
  profesorPost,
};
