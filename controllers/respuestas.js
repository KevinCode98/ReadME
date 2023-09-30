const { response } = require('express');
const respuestasDB = require('../querys/respuestas');

const respuestaGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await respuestasDB.getRespuestas(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - respuestaGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - respuestaGet',
    });
  }
};

const respuestasDeQuestionarioGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await respuestasDB.getRespuestasDeQuestionario(req.body));
  } catch (error) {
    console.log(error);
    console.error(
      'Error en la petición de base de datos - respuestasDeQuestionarioGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - respuestasDeQuestionarioGet',
    });
  }
};

const respuestaPost = async (req, res = response) => {
  try {
    const id_alumno = req.usuario.ID_USUARIO;
    res.json(await respuestasDB.postRespuestas(req.body, id_alumno));
  } catch (error) {
    console.error('Error en la petición de base de datos - respuestaPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - respuestaPost',
    });
  }
};

module.exports = {
  respuestaGet,
  respuestaPost,
  respuestasDeQuestionarioGet,
};
