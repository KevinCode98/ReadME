const { response } = require('express');
const { existeError } = require('../helpers/validator');
const questionarioDB = require('../querys/questionarios');

const questionarioGet = async (req, res = response) => {
  try {
    res.json(await questionarioDB.getQuestionario(req.params.id));
  } catch (error) {
    existeError(res, error, 'questionarioGet');
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
    existeError(res, error, 'questionarioContestadoGet');
  }
};

const questionarioRespuestasPorAlumno = async (questionario) => {
  // TODO: Terminar
  try {
    // res.json(await )
  } catch (error) {
    existeError(res, error, 'questionarioRespuestasPorAlumno');
  }
};

const questionarioConPreguntasGet = async (req, res = response) => {
  try {
    res.json(await questionarioDB.getQuestionarioConPreguntas(req.params.id));
  } catch (error) {
    existeError(res, error, 'questionarioConPreguntasGet');
  }
};

const questionarioPost = async (req, res = response) => {
  try {
    const questionario = await questionarioDB.postQuestionario(req.body);

    if (questionario.msg) return res.status(400).json(questionario);
    res.status(200).json(questionario);
  } catch (error) {
    existeError(res, error, 'questionarioPost');
  }
};

module.exports = {
  questionarioGet,
  questionarioContestadoGet,
  questionarioRespuestasPorAlumno,
  questionarioConPreguntasGet,
  questionarioPost,
};
