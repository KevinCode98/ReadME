const { response, request } = require('express');
const preguntaDB = require('../querys/preguntas.js');
const { validationResult } = require('express-validator');

const preguntaGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await preguntaDB.getPregunta(id));
  } catch (error) {
    console.error(' Error en la petición de base de datos');
  }
};

const preguntaPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await preguntaDB.postPregunta(req.body));
  } catch (error) {
    console.log(error);
    console.error(' Error en la petición de base de datos');
  }
};

module.exports = {
  preguntaGet,
  preguntaPost,
};
