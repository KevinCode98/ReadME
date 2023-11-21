const { response } = require('express');
const { existeError } = require('../helpers/validator');
const preguntaDB = require('../querys/preguntas');

const preguntaGet = async (req, res = response) => {
  try {
    res.json(await preguntaDB.getPregunta(req.params.id));
  } catch (error) {
    existeError(res, error, 'preguntaGet');
  }
};

const preguntaConOpcionesGet = async (req, res = response) => {
  try {
    res.json(await preguntaDB.getPreguntaConOpciones(req.body.id_pregunta));
  } catch (error) {
    existeError(res, error, 'preguntaConOpcionesGet');
  }
};

const preguntaPost = async (req, res = response) => {
  try {
    res.json(await preguntaDB.postPregunta(req.body));
  } catch (error) {
    existeError(res, error, 'preguntaPost');
  }
};

const preguntaDelete = async (req, res = response) => {
  try {
    res.json(await preguntaDB.deletePregunta(req.params.id));
  } catch (error) {
    console.log('Error - preguntaDelete');
  }
};

module.exports = {
  preguntaGet,
  preguntaPost,
  preguntaConOpcionesGet,
  preguntaDelete,
};
