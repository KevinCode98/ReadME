const { response, request } = require('express');
const salasDB = require('../querys/salas');

const salasGet = async (req, res = response) => {
  try {
    res.json(await salasDB.getSalas());
  } catch (error) {
    console.error('Error en la petición de base de datos - salasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - salasGet',
    });
  }
};

const salaGet = async (req, res = response) => {
  const id = req.params.id;
  try {
    res.json(await salasDB.getSalas(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - salaGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - salaGet',
    });
  }
};

const salasPost = async (req, res = response) => {
  try {
    res.json(await salasDB.postSalas(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - salasPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - salasPost',
    });
  }
};

module.exports = {
  salaGet,
  salasGet,
  salasPost,
};
