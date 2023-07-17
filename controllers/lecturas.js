const { response, request } = require('express');
const lecturaDB = require('../querys/lecturas');

const lecturasGet = async (req, res = responese) => {
  try {
    res.json(await lecturaDB.getLecturas());
  } catch (error) {
    console.error('Error en la petición de base de datos - lecturasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturasGet',
    });
  }
};

const lecturaGet = async (req, res = responese) => {
  const id = req.params.id;

  try {
    res.json(await lecturaDB.getLectura(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - lecturasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturasGet',
    });
  }
};

const lecturaPost = async (req, res = response) => {
  try {
    res.json(await lecturaDB.postLectura(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - lecturaPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturaPost',
    });
  }
};

module.exports = {
  lecturaGet,
  lecturasGet,
  lecturaPost,
};
