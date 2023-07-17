const { response, request } = require('express');
const cerradasDB = require('../querys/cerradas');

const cerradasGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await cerradasDB.getCerradas(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - cerradasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - cerradasGet',
    });
  }
};

const cerradaPost = async (req, res = response) => {
  try {
    res.json(await cerradasDB.postCerrada(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - cerradaPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - cerradaPost',
    });
  }
};

module.exports = {
  cerradasGet,
  cerradaPost,
};
