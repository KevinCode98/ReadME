const { response, request } = require('express');
const respuestasDB = require('../querys/respuestas');

const respuestasGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await respuestasDB.getRespuestas(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - respuestasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - respuestasGet',
    });
  }
};

const respuestaPost = async (req, res = response) => {
  try {
    res.json(await respuestasDB.postRespuestas(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - respuestaPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - respuestaPost',
    });
  }
};

module.exports = {
  respuestasGet,
  respuestaPost,
};
