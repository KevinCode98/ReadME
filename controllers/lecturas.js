const { response, request } = require('express');
const lecturaDB = require('../querys/lecturas');
const { validationResult } = require('express-validator');

const lecturasGet = async (req, res = responese) => {
  try {
    res.json(await lecturaDB.getLecturas());
  } catch (error) {
    console.error('Error en la petición de base de datos');
  }
};

const lecturaGet = async (req, res = responese) => {
  const id = req.params.id;

  try {
    res.json(await lecturaDB.getLectura(id));
  } catch (error) {
    console.error('Error en la petición de base de datos');
  }
};

const lecturaPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await lecturaDB.postLectura(req.body));
  } catch (error) {
    console.error('Error en la petición de la base de datos');
  }
};

module.exports = {
  lecturaGet,
  lecturasGet,
  lecturaPost,
};
