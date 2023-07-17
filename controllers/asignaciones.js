const { response, request } = require('express');
const asignacionesDB = require('../querys/asignaciones');

const asignacionGet = async (req, res = response) => {
  const id = req.params.id;
  try {
    res.json(await asignacionesDB.getAsignacion(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - asignacionGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - asignacionGet',
    });
  }
};

const asignacionPost = async (req, res = response) => {
  try {
    res.json(await asignacionesDB.postAsignacion(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - asignacionPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - asignacionPost',
    });
  }
};

module.exports = {
  asignacionGet,
  asignacionPost,
};
