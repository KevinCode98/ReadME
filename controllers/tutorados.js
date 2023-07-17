const { response, request } = require('express');
const tutoradoDB = require('../querys/tutorados');

const tutoradoGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await tutoradoDB.getTutorado(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - tutoradoGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - tutoradoGet',
    });
  }
};

const tutoradoPost = async (req, res = response) => {
  try {
    res.json(await tutoradoDB.postTutorado(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - tutoradoPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - tutoradoPost',
    });
  }
};

module.exports = {
  tutoradoGet,
  tutoradoPost,
};
