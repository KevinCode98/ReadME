const { response, request } = require('express');
const autoresDB = require('../querys/autores');
const { validationResult } = require('express-validator');

const autoresGet = async (req, res = response) => {
  try {
    res.json(await autoresDB.getAutores());
  } catch (error) {
    console.error('Error en la petición de base de datos - autoresGet');
  }
};

const autorGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await autoresDB.getAutor(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - autorGet');
  }
};

const autorPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await autoresDB.postAutor(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - autorPost');
  }
};

module.exports = {
  autoresGet,
  autorGet,
  autorPost,
};
