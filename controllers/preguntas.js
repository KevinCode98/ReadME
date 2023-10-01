const { response } = require('express');
const preguntaDB = require('../querys/preguntas');

const preguntaGet = async (req, res = response) => {
  try {
    res.json(await preguntaDB.getPregunta(req.params.id));
  } catch (error) {
    console.error('Error en la petición de base de datos - preguntaGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - preguntaGet',
    });
  }
};

const preguntaConOpcionesGet = async (req, res = response) => {
  try {
    res.json(await preguntaDB.getPreguntaConOpciones(req.body.id_pregunta));
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de base de datos - preguntaGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - preguntaGet',
    });
  }
};

const preguntaPost = async (req, res = response) => {
  try {
    res.json(await preguntaDB.postPregunta(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - preguntaPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - preguntaPost',
    });
  }
};

module.exports = {
  preguntaGet,
  preguntaPost,
  preguntaConOpcionesGet,
};
