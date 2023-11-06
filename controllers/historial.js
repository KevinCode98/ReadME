const { response } = require('express');
const historialDB = require('../querys/historial.js');

const historialPorIdGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await historialDB.getHistorialPorId(req.usuario.ID_USUARIO));
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de base de datos - historialPorIdGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - historialPorIdGet',
    });
  }
};

const historialPost = async (dataHistorial, id_alumno) => {
  try {
    return await historialDB.postHistorial(dataHistorial, id_alumno);
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
