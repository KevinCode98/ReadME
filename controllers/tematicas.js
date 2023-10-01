const { response } = require('express');
const tematicasDB = require('../querys/tematicas');

const tematicasGet = async (req, res = response) => {
  try {
    res.status(200).json(await tematicasDB.getTematicas());
  } catch (error) {
    console.error('Error en la petición de base de datos - tematicasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - tematicasGet',
    });
  }
};

const tematicaGet = async (req, res = response) => {
  try {
    res.status(200).json(await tematicasDB.getTematica(req.params.id));
  } catch (error) {
    console.error('Error en la petición de base de datos - tematicaGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - tematicaGet',
    });
  }
};

module.exports = {
  tematicasGet,
  tematicaGet,
};
