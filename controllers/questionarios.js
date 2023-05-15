const { response, request } = require('express');
const questionarioDB = require('../querys/questionarios.js');
const { validationResult } = require('express-validator');

const questionarioGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await questionarioDB.getQuestionario(id));
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de base de datos');
  }
};

const questionarioPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await questionarioDB.postQuestionario(req.body));
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de base de datos');
  }
};

module.exports = {
  questionarioGet,
  questionarioPost,
};
