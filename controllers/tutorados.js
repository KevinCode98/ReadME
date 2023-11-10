const { response } = require('express');
const { existeError } = require('../helpers/validator');
const tutoradoDB = require('../querys/tutorados');

const tutoradoGet = async (req, res = response) => {
  try {
    const tutorado = await tutoradoDB.getTutorado(req.params.id);

    if (tutorado === null)
      return res.status(400).json({
        msg: 'El alumno no cuenta con tutorado',
      });

    res.status(200).json(tutorado);
  } catch (error) {
    console.error('Error en la petición de base de datos - tutoradoGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - tutoradoGet',
    });
  }
};

const tutoradoPost = async (req, res = response) => {
  try {
    const tutorado = await tutoradoDB.postTutorado(req.body);
    if (tutorado.msg) return res.status(400).json(tutorado);

    res.status(200).json(tutorado);
  } catch (error) {
    console.error('Error en la petición de base de datos - tutoradoPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - tutoradoPost',
    });
  }
};

// TODO: Generar la actualizacion del Tutor

module.exports = {
  tutoradoGet,
  tutoradoPost,
};
