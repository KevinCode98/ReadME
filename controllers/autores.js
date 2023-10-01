const { response } = require('express');
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

const autoresNombreGet = async (req, res = response) => {
  try {
    if (Object.keys(req.query.nombre).length == 0)
      res.json(await autoresDB.getAutores());
    else res.json(await autoresDB.getNombresAutores(req.query.nombre));
  } catch (error) {
    console.error('Error en la petición de base de datos - autoresNombreGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - autoresNombreGet',
    });
  }
};

const autorGet = async (req, res = response) => {
  try {
    res.json(await autoresDB.getAutor(req.params.id));
  } catch (error) {
    console.error('Error en la petición de base de datos - autorGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - autorGet',
    });
  }
};

const autorPost = async (req, res = response) => {
  try {
    res.status(200).json(await autoresDB.postAutor(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - autorPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - autorPost',
    });
  }
};

const autorActualizarPost = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await autoresDB.postActualizarAutor(req.body, req.params.id));
  } catch (error) {
    console.error(
      'Error en la petición de base de datos - autorActualizarPost'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - autorActualizarPost',
    });
  }
};

module.exports = {
  autorActualizarPost,
  autoresGet,
  autoresNombreGet,
  autorGet,
  autorPost,
};
