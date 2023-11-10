const { response } = require('express');
const { existeError } = require('../helpers/validator');
const tematicasDB = require('../querys/tematicas');

const tematicasGet = async (req, res = response) => {
  try {
    res.status(200).json(await tematicasDB.getTematicas());
  } catch (error) {
    existeError(res, error, 'tematicasGet');
  }
};

const tematicaGet = async (req, res = response) => {
  try {
    res.status(200).json(await tematicasDB.getTematica(req.params.id));
  } catch (error) {
    existeError(res, error, 'tematicaGet');
  }
};

module.exports = {
  tematicasGet,
  tematicaGet,
};
