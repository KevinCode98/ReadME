const { response } = require('express');
const opcionesDB = require('../querys/opciones');

const opcionGet = async (req, res = response) => {
  try {
    res.json(await opcionesDB.getOpcion(req.params.id));
  } catch (error) {
    console.error('Error en la petición de base de datos - opcionGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - opcionGet',
    });
  }
};

const opcionPost = async (req, res = response) => {
  try {
    res.json(await opcionesDB.postOpcion(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - opcionPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - opcionPost',
    });
  }
};

module.exports = {
  opcionGet,
  opcionPost,
};
