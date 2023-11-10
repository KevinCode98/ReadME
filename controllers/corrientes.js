const { response } = require('express');
const { existeError } = require('../helpers/validator');
const corrientesDB = require('../querys/corrientes');

const corrientesGet = async (req, res = response) => {
  try {
    res.status(200).json(await corrientesDB.getCorrientes());
  } catch (error) {
    existeError(res, error, 'corrientesGet');
  }
};

const corrienteGet = async (req, res = response) => {
  try {
    res.status(200).json(await corrientesDB.getCorriente(req.params.id));
  } catch (error) {
    existeError(res, error, 'corrienteGet');
  }
};

module.exports = {
  corrienteGet,
  corrientesGet,
};
