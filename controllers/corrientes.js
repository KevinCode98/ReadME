const { response } = require('express');
const corrientesDB = require('../querys/corrientes');

const corrientesGet = async (req, res = response) => {
  try {
    res.status(200).json(await corrientesDB.getCorrientes());
  } catch (error) {
    console.error('Error en la petición de base de datos - corrientesGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - corrientesGet',
    });
  }
};

const corrienteGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.status(200).json(await corrientesDB.getCorriente(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - corrienteGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - corrienteGet',
    });
  }
};

module.exports = {
  corrienteGet,
  corrientesGet,
};
