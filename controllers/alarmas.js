const { response } = require('express');
const alarmasDB = require('../querys/alarmas');
const { existeError } = require('../helpers/validator');

const alarmaGet = async (req, res = response) => {
  try {
    res.status(200).json(await alarmasDB.getAlarma(req.params.id_alarma));
  } catch (error) {
    existeError(res, error, 'alarmaGet');
  }
};

const alarmasPorIdGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await alarmasDB.getAlarmasPorID(req.usuario.ID_USUARIO));
  } catch (error) {
    existeError(res, error, 'alarmasPorIdGet');
  }
};

const alarmaPost = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await alarmasDB.postAlarma(req.body, req.usuario.ID_USUARIO));
  } catch (error) {
    existeError(res, error, 'alarmaPost');
  }
};

const alarmaDelete = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await alarmasDB.deleteAlarma(req.params.id, req.usuario.ID_USUARIO)
      );
  } catch (error) {
    existeError(res, error, 'alarmaDelete');
  }
};

module.exports = {
  alarmaGet,
  alarmasPorIdGet,
  alarmaPost,
  alarmaDelete,
};
