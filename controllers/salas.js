const { response, request } = require('express');
const salasDB = require('../querys/salas');
const { validationResult } = require('express-validator');

const salasGet = async (req, res = response) => {
  try {
    res.json(await salasDB.getSalas());
  } catch (error) {
    console.error('Error en la petición de base de datos - salasGet');
  }
};

const salaGet = async (req, res = response) => {
  const id = req.params.id;
  try {
    res.json(await salasDB.getSalas(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - salaGet');
  }
};

const salasPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await salasDB.postSalas(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - salasPost');
  }
};

module.exports = {
  salaGet,
  salasGet,
  salasPost,
};
