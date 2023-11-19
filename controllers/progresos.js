const { response } = require('express');
const progresosDB = require('../querys/progresos');
const { existeError } = require('../helpers/validator');

const progresosPorIdGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await progresosDB.getProgresoPorId(req.usuario.ID_USUARIO));
  } catch (error) {
    existeError(res, error, 'progresosPorIdGet');
  }
};

const progresosPorDia = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await progresosDB.getProgresosPorDia(
          req.usuario.ID_USUARIO,
          req.query.fecha
        )
      );
  } catch (error) {
    existeError(res, error, 'progresosPorDia');
  }
};

const progresosPorSemana = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await progresosDB.getProgresoPorSemana(
          req.usuario.ID_USUARIO,
          req.query.fecha
        )
      );
  } catch (error) {
    existeError(res, error, 'progresosPorSemana');
  }
};

const progresosPorMes = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await progresosDB.getProgresoPorMes(
          req.usuario.ID_USUARIO,
          req.query.fecha
        )
      );
  } catch (error) {
    existeError(res, error, 'progresosPorMes');
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
    existeError(res, error, 'progresosPorLecturaAlumnoGet');
  }
};

const progresosPost = async (dataProgreso, id_alumno, tiempo) => {
  try {
    return await progresosDB.postProgreso(dataProgreso, id_alumno, tiempo);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  progresosPorDia,
  progresosPorIdGet,
  progresosPorLecturaAlumnoGet,
  progresosPorMes,
  progresosPorSemana,
  progresosPost,
};
