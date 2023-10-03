const { response } = require('express');
const questionarioDB = require('../querys/questionarios');

const questionarioGet = async (req, res = response) => {
  try {
    res.json(await questionarioDB.getQuestionario(req.params.id));
  } catch (error) {
    console.error('Error en la petición de base de datos - questionarioGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - questionarioGet',
    });
  }
};

const questionarioConPreguntasGet = async (req, res = response) => {
  try {
    res.json(await questionarioDB.getQuestionarioConPreguntas(req.params.id));
  } catch (error) {
    console.error(
      'Error en la petición de base de datos - questionarioConPreguntasGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - questionarioConPreguntasGet',
    });
  }
};

const questionarioPost = async (req, res = response) => {
  try {
    res.json(await questionarioDB.postQuestionario(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - questionarioPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - questionarioPost',
    });
  }
};

module.exports = {
  questionarioGet,
  questionarioConPreguntasGet,
  questionarioPost,
};
