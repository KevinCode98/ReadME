const { response, request } = require('express');
const asignacionesDB = require('../querys/asignaciones');

const asignacionGet = async (req, res = response) => {
  const id = req.params.id;
  try {
    res.json(await asignacionesDB.getAsignacion(id));
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de base de datos - asignacionGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - asignacionGet',
    });
  }
};

// TODO: End-Point retornar asignaciones por sala
const asignacionPost = async (req, res = response) => {
  try {
    const asignacion = await asignacionesDB.postAsignacion(req.body);
    if (asignacion.msg) return res.status(400).json(asignacion);

    res.status(200).json(asignacion);
  } catch (error) {
    console.error('Error en la petición de base de datos - asignacionPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - asignacionPost',
    });
  }
};

// TODO: End-Point retornar asignaciones por sala
const asignacionesPorSalaGet = async (req, res = response) => {
  const idSala = req.params.idSala;

  try {
    const asignacion = await asignacionesDB.getAsignacionesPorSala(idSala);
    if (asignacion.msg) return res.status(400).json(asignacion);

    res.status(200).json(asignacion);
  } catch (error) {
    console.error(
      'Error en la petición de base de datos - asignacionesPorSalaGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - asignacionesPorSalaGet',
    });
  }
};

module.exports = {
  asignacionGet,
  asignacionesPorSalaGet,
  asignacionPost,
};
