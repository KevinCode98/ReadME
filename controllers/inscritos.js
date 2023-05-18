const { response, request } = require('express');
const inscritosDB = require('../querys/inscritos');
const { validationResult } = require('express-validator');

const inscritosGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await inscritosDB.getInscritos(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - inscritosGet');
  }
};

const inscritosPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await inscritosDB.postInscritos(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - inscritosPost');
  }
};

module.exports = {
  inscritosGet,
  inscritosPost,
};
