const { response } = require('express');
const progresosDB = require('../querys/progresos');

const progresosPorIdGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await progresosDB.getProgresoPorId(req.usuario.ID_USUARIO));
  } catch (error) {
    console.error('Error en la petición de base de datos - progresosPorIdGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - progresosPorIdGet',
    });
  }
};

const progresosPorDia = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await progresosDB.getProgresosPorDia(
          req.usuario.ID_USUARIO,
          req.body.fecha
        )
      );
  } catch (error) {
    console.error('Error en la petición de base de datos - progresosPorDia');
    return res.status(500).json({
      msg: 'Hable con el administrador - progresosPorDia',
    });
  }
};

const progresosPorLecturaAlumnoGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await progresosDB.getProgresoPorLectura(
          req.usuario.ID_USUARIO,
          req.params.id
        )
      );
  } catch (error) {
    console.error(
      'Error en la petición de base de datos - progresosPorAlumnoGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - progresosPorAlumnoGet',
    });
  }
};

const progresosPost = async (dataProgreso, id_alumno) => {
  try {
    return await progresosDB.postProgreso(dataProgreso, id_alumno);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  progresosPorIdGet,
  progresosPorLecturaAlumnoGet,
  progresosPorDia,
  progresosPost,
};
