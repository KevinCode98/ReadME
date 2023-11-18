const { response } = require('express');
const { existeError } = require('../helpers/validator');
const puntuacionesDB = require('../querys/puntuaciones');
const lecturasDB = require('../querys/lecturas');

const puntuacionesGet = async (req, res = response) => {
  try {
    res.status(200).json(await puntuacionesDB.getPuntuacion(req.params.id));
  } catch (error) {
    existeError(res, error, 'puntuacionesGet');
  }
};

const puntuacionesMisLecturasGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await puntuacionesDB.getPuntuacionMisLecturas(req.usuario.ID_USUARIO)
      );
  } catch (error) {
    existeError(res, error, 'puntuacionesMisLecturasGet');
  }
};

const puntuacionesPost = async (req, res = response) => {
  try {
    const id_lectura = req.body.id_lectura;

    const puntuacion = await puntuacionesDB.postPuntuacion(
      req.body,
      req.usuario.ID_USUARIO
    );

    const cantidadPuntuaciones = await puntuacionesDB.getCantidadPuntuaciones(
      id_lectura
    );
    const sumaPuntuaciones = await puntuacionesDB.getSumaPuntuaciones(
      id_lectura
    );

    const promedioLectura =
      Number(sumaPuntuaciones) / Number(cantidadPuntuaciones);

    const nuevoPromedioLectura = await lecturasDB.actualizarPuntuacionLectura(
      id_lectura,
      promedioLectura
    );

    res.status(200).json({ puntuacion, nuevoPromedioLectura });
  } catch (error) {
    existeError(res, error, 'puntuacionesPost');
  }
};

module.exports = {
  puntuacionesGet,
  puntuacionesPost,
  puntuacionesMisLecturasGet,
};
