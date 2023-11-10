const { response } = require('express');
const { existeError } = require('../helpers/validator');
const nacionalidadesDB = require('../querys/nacionalidades');

const nacionalidadesGet = async (req, res = response) => {
  try {
    res.status(200).json(await nacionalidadesDB.getNacionalidades());
  } catch (error) {
    existeError(res, error, 'nacionalidadesGet');
  }
};

const nacionalidadGet = async (req, res = response) => {
  try {
    res.status(200).json(await nacionalidadesDB.getNacionalidad(req.params.id));
  } catch (error) {
    existeError(res, error, 'nacionalidadGet');
  }
};

module.exports = {
  nacionalidadGet,
  nacionalidadesGet,
};
