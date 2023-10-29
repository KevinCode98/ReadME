const { response } = require('express');
const historialDB = require('../querys/historial.js');

const historialPorIdGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await historialDB.getHistorialPorId(req.usuario.ID_USUARIO));
  } catch (error) {
    console.error('Error en la petición de base de datos - historialPorIdGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - historialPorIdGet',
    });
  }
};

const historialPost = async (req, res = response) => {
  try {
    const historial = await historialDB.postHistorial(
      req.body,
      req.usuario.ID_USUARIO
    );
    if (historial.msg) return res.status(400).json(historial);

    res.status(200).json(historial);
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de base de datos - historialPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - historialPost',
    });
  }
};

module.exports = {
  historialPorIdGet,
  historialPost,
};
