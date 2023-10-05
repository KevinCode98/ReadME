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

const questionarioContestadoGet = async (req, res = response) => {
  try {
    res.json(
      await questionarioDB.getQuestionarioContestado(
        req.body.id_questionario,
        req.usuario.ID_USUARIO
      )
    );
  } catch (error) {
    console.log(error);
    console.error(
      'Error en la petición de base de datos - questionarioContestadoGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - questionarioContestadoGet',
    });
  }
};

const questionarioRespuestasPorAlumno = async (questionario) => {
  try {
    // res.json(await )
  } catch (error) {
    console.log(error);
    console.error(
      'Error en la petición de base de datos - questionarioRespuestasPorAlumno'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - questionarioRespuestasPorAlumno',
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
    const questionario = await questionarioDB.postQuestionario(req.body);

    if (questionario.msg) return res.status(400).json(questionario);
    res.status(200).json(questionario);
  } catch (error) {
    console.error('Error en la petición de base de datos - questionarioPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - questionarioPost',
    });
  }
};

module.exports = {
  questionarioGet,
  questionarioContestadoGet,
  questionarioRespuestasPorAlumno,
  questionarioConPreguntasGet,
  questionarioPost,
};
