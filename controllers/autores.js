const { response, request } = require('express');
const autoresDB = require('../querys/autores');

const autoresGet = async (req, res = response) => {
  try {
    res.json(await autoresDB.getAutores());
  } catch (error) {
    console.error('Error en la petición de base de datos - autoresGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - autoresGet',
    });
  }
};

const autorGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await autoresDB.getAutor(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - autorGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - autorGet',
    });
  }
};

const autorPost = async (req, res = response) => {
  try {
    res.json(await autoresDB.postAutor(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - autorPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - autorPost',
    });
  }
};

module.exports = {
  autoresGet,
  autorGet,
  autorPost,
};
