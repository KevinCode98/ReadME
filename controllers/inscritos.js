const { response, request } = require('express');
const inscritosDB = require('../querys/inscritos');

const inscritosGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await inscritosDB.getInscritos(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - inscritosGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - inscritosGet',
    });
  }
};

const inscritosPost = async (req, res = response) => {
  try {
    res.json(await inscritosDB.postInscritos(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - inscritosPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - inscritosPost',
    });
  }
};

module.exports = {
  inscritosGet,
  inscritosPost,
};
