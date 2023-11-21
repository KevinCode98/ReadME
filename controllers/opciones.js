const { response } = require('express');
const { existeError } = require('../helpers/validator');
const opcionesDB = require('../querys/opciones');

const opcionGet = async (req, res = response) => {
  try {
    res.json(await opcionesDB.getOpcion(req.params.id));
  } catch (error) {
    existeError(res, error, 'opcionGet');
  }
};

const opcionPost = async (req, res = response) => {
  try {
    res.json(await opcionesDB.postOpcion(req.body));
  } catch (error) {
    existeError(res, error, 'opcionPost');
  }
};

const opcionDelete = async (req, res = response) => {
  try {
    return await opcionesDB(req.query.id);
  } catch (error) {
    console.log('Error - opcionDelete');
  }
};

module.exports = {
  opcionGet,
  opcionPost,
  opcionDelete,
};
