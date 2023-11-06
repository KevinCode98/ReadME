const { response } = require('express');
const leidosDB = require('../querys/leidos');
const progresosDB = require('../querys/progresos');

const leidosGet = async (req, res = response) => {
  try {
    res.status(200).json(await leidosDB.getLeido(req.params.id));
  } catch (error) {
    console.error('Error en la petición de base de datos - leidosGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - leidosGet',
    });
  }
};

const leidosPost = async (dataLeidos, id_alumno, id_historial) => {
  try {
    return await leidosDB.postLeido(dataLeidos, id_alumno, id_historial);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  leidosGet,
  leidosPost,
};
