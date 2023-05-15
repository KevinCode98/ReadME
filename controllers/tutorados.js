const { response, request } = require('express');
const tutoradoDB = require('../querys/tutorados');
const { validationResult } = require('express-validator');

const tutoradoGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await tutoradoDB.tutoradoGet(id));
  } catch (error) {
    console.error(' Error en la petición de base de datos');
  }
};

const tutoradoPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await tutoradoDB.tutoradoPost(req.body));
  } catch (error) {
    console.error('Error en la petición de la base de datos');
  }
};

module.exports = {
  tutoradoGet,
  tutoradoPost,
};
