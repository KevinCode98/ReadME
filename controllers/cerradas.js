const { response, request } = require('express');
const cerradasDB = require('../querys/cerradas');
const { validationResult } = require('express-validator');

const cerradasGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await cerradasDB.getCerradas(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - cerradasGet');
  }
};

const cerradaPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await cerradasDB.postCerrada(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - cerradaPost');
  }
};

module.exports = {
  cerradasGet,
  cerradaPost,
};
