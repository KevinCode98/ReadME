const { response } = require('express');
const { existeError } = require('../helpers/validator');
const autoresDB = require('../querys/autores');

const autoresGet = async (req, res = response) => {
  try {
    res.json(await autoresDB.getAutores());
  } catch (error) {
    existeError(res, error, 'autoresGet');
  }
};

const autoresNombreGet = async (req, res = response) => {
  try {
    if (Object.keys(req.query.nombre).length == 0)
      res.json(await autoresDB.getAutores());
    else res.json(await autoresDB.getNombresAutores(req.query.nombre));
  } catch (error) {
    existeError(res, error, 'autoresNombreGet');
  }
};

const autorGet = async (req, res = response) => {
  try {
    res.json(await autoresDB.getAutor(req.params.id));
  } catch (error) {
    existeError(res, error, 'autorGet');
  }
};

const autorPost = async (req, res = response) => {
  try {
    res.status(200).json(await autoresDB.postAutor(req.body));
  } catch (error) {
    existeError(res, error, 'autorPost');
  }
};

const autorActualizarPost = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await autoresDB.postActualizarAutor(req.body, req.params.id));
  } catch (error) {
    existeError(res, error, 'autorActualizarPost');
  }
};

module.exports = {
  autorActualizarPost,
  autoresGet,
  autoresNombreGet,
  autorGet,
  autorPost,
};
