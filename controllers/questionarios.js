const { response } = require('express');
const questionarioDB = require('../querys/questionarios');

const questionarioGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await questionarioDB.getQuestionario(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - questionarioGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - questionarioGet',
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
  questionarioPost,
};
