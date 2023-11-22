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
    const id = req.query.id ? req.query.id : req.usuario.ID_USUARIO;
    const progreso = await progresosDB.getProgresosPorDia(
      Number(id),
      req.query.fecha
    );

    if (progreso.msg) return res.status(400).json(progreso);
    res.status(200).json(progreso);
  } catch (error) {
    existeError(res, error, 'progresosPorDia');
  }
};

const progresosPorSemana = async (req, res = response) => {
  try {
    const id = req.query.id ? req.query.id : req.usuario.ID_USUARIO;
    const progreso = await progresosDB.getProgresoPorSemana(
      Number(id),
      req.query.fecha
    );

    if (progreso.msg) return res.status(400).json(progreso);
    res.status(200).json(progreso);
  } catch (error) {
    existeError(res, error, 'progresosPorSemana');
  }
};

const progresosPorMes = async (req, res = response) => {
  try {
    const id = req.query.id ? req.query.id : req.usuario.ID_USUARIO;
    const progreso = await progresosDB.getProgresoPorMes(
      Number(id),
      req.query.fecha
    );

    if (progreso.msg) return res.status(400).json(progreso);
    res.status(200).json(progreso);
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
