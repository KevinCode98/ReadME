const { response } = require('express');
const puntuacionesDB = require('../querys/puntuaciones');
const lecturasDB = require('../querys/lecturas');

const puntuacionesGet = async (req, res = response) => {
  try {
    res.status(200).json(await puntuacionesDB.getPuntuacion(req.params.id));
  } catch (error) {
    console.error('Error en la petición de base de datos - puntuacionesGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - puntuacionesGet',
    });
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
    console.error('Error en la petición de base de datos - puntuacionesGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - puntuacionesGet',
    });
  }
};

module.exports = { puntuacionesGet, puntuacionesPost };
