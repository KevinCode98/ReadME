const { response, request } = require('express');
const respuestasDB = require('../querys/respuestas');
const { validationResult } = require('express-validator');

const respuestasGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await respuestasDB.getRespuestas(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - respuestasGet');
  }
};

const respuestaPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await respuestasDB.postRespuestas(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - respuestaPost');
  }
};

module.exports = {
  respuestasGet,
  respuestaPost,
};
