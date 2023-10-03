const { response } = require('express');
const nacionalidadesDB = require('../querys/nacionalidades');

const nacionalidadesGet = async (req, res = response) => {
  try {
    res.status(200).json(await nacionalidadesDB.getNacionalidades());
  } catch (error) {
    console.error('Error en la petición de base de datos - nacionalidadesGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - nacionalidadesGet',
    });
  }
};

const nacionalidadGet = async (req, res = response) => {
  try {
    res.status(200).json(await nacionalidadesDB.getNacionalidad(req.params.id));
  } catch (error) {
    console.error('Error en la petición de base de datos - nacionalidadGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - nacionalidadGet',
    });
  }
};

module.exports = {
  nacionalidadGet,
  nacionalidadesGet,
};
