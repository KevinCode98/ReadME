const { response, request } = require('express');
const asignacionesDB = require('../querys/asignaciones');
const { validationResult } = require('express-validator');

const asignacionGet = async (req, res = response) => {
  const id = req.params.id;
  try {
    res.json(await asignacionesDB.getAsignacion(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - asignacionGet');
  }
};

const asignacionPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await asignacionesDB.postAsignacion(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - asignacionPost');
  }
};

module.exports = {
  asignacionGet,
  asignacionPost,
};
