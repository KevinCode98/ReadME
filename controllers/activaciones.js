const { response } = require('express');
const activacionesDB = require('../querys/activaciones');
const { existeError } = require('../helpers/validator');

const actualizarActivacionPost = async (req, res = response) => {
  try {
    const activacion = await activacionesDB.postActualizarCodigo(
      req.usuario.ID_USUARIO
    );
    if (activacion.msg) return res.status(400).json(activacion);

    res.status(200).json(activacion);
  } catch (error) {
    existeError(res, error, 'actualizarActivacionPost');
  }
};

const validarActivacionPost = async (req, res = response) => {
  try {
    const activacion = await activacionesDB.postValidarActivacion(
      req.usuario.ID_USUARIO,
      req.body.codigo
    );
    if (activacion.msg) return res.status(400).json(activacion);

    res.status(200).json(activacion);
  } catch (error) {
    existeError(res, error, 'validarActivacionPost');
  }
};

module.exports = {
  actualizarActivacionPost,
  validarActivacionPost,
};
