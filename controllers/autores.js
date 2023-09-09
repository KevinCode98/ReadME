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
  const nombre = req.query.nombre;

  try {
    if (Object.keys(nombre).length == 0) res.json(await autoresDB.getAutores());
    else res.json(await autoresDB.getNombresAutores(nombre));
  } catch (error) {
    console.error('Error en la petición de base de datos - autoresNombreGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - autoresNombreGet',
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

const autorActualizarPost = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await autoresDB.postActualizarAutor(req.body, id));
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
