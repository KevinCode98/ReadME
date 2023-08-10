const { response, request } = require('express');
const tutoradoDB = require('../querys/tutorados');

const tutoradoGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    const tutorado = await tutoradoDB.getTutorado(id);

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

module.exports = {
  tutoradoGet,
  tutoradoPost,
};
