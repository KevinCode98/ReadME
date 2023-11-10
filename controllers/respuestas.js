const { response } = require('express');
const { existeError } = require('../helpers/validator');
const respuestasDB = require('../querys/respuestas');

const respuestaGet = async (req, res = response) => {
  try {
    res.json(await respuestasDB.getRespuestas(req.params.id));
  } catch (error) {
    existeError(res, error, 'respuestaGet');
  }
};

const respuestasPuntosGet = async (req, res = response) => {
  try {
    res.status(200).json(await respuestasDB.getRespuestasPuntos(req.body));
  } catch (error) {
    existeError(res, error, 'respuestasPuntosGet');
  }
};

const respuestasPuntosAlumnosQuestionarioGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await respuestasDB.getRespuestasPuntosAlumnosQuestionario(
          req.body.id_questionario
        )
      );
  } catch (error) {
    existeError(res, error, 'respuestasPuntosAlumnosQuestionarioGet');
  }
};

const respuestasDeQuestionarioGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await respuestasDB.getRespuestasDeQuestionario(req.body));
  } catch (error) {
    existeError(res, error, 'respuestasDeQuestionarioGet');
  }
};

const respuestaPost = async (req, res = response) => {
  try {
    res.json(
      await respuestasDB.postRespuestas(req.body, req.usuario.ID_USUARIO)
    );
  } catch (error) {
    existeError(res, error, 'respuestaPost');
  }
};

module.exports = {
  respuestaGet,
  respuestaPost,
  respuestasDeQuestionarioGet,
  respuestasPuntosAlumnosQuestionarioGet,
  respuestasPuntosGet,
};
