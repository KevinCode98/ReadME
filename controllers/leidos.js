const { response } = require('express');
const { existeError } = require('../helpers/validator');
const leidosDB = require('../querys/leidos');

const leidosGet = async (req, res = response) => {
  try {
    res.status(200).json(await leidosDB.getLeido(req.params.id));
  } catch (error) {
    existeError(res, error, 'leidosGet');
  }
};

const leidosPost = async (dataLeidos, id_alumno, id_historial, tiempo) => {
  try {
    return await leidosDB.postLeido(
      dataLeidos,
      id_alumno,
      id_historial,
      tiempo
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  leidosGet,
  leidosPost,
};
