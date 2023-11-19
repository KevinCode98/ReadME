const { response } = require('express');
const { existeError } = require('../helpers/validator');
const historialDB = require('../querys/historial.js');

const historialPorIdGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await historialDB.getHistorialPorId(req.usuario.ID_USUARIO));
  } catch (error) {
    existeError(res, error, 'historialPorIdGet');
  }
};

const historialPost = async (dataHistorial, id_alumno, tiempo) => {
  try {
    return await historialDB.postHistorial(dataHistorial, id_alumno, tiempo);
  } catch (error) {
    console.log(error);
  }
};

const historialDelete = async (id_historial) => {
  try {
    return await historialDB.deleteHistorial(id_historial);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  historialPorIdGet,
  historialPost,
  historialDelete,
};
