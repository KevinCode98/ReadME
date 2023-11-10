const { response } = require('express');
const { existeError } = require('../helpers/validator');
const salasDB = require('../querys/salas');

const salasGet = async (req, res = response) => {
  try {
    res.json(await salasDB.getSalas());
  } catch (error) {
    existeError(res, error, 'salasGet');
  }
};

const salaGet = async (req, res = response) => {
  try {
    const sala = await salasDB.getSala(req.params.id);

    if (sala === null)
      return res.status(400).json({
        msg: `No se encontro una sala con el hash: ${hash}`,
      });

    res.status(200).json(sala);
  } catch (error) {
    existeError(res, error, 'salaGet');
  }
};

const salasPost = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await salasDB.postSalas(req.usuario.ID_USUARIO, req.body));
  } catch (error) {
    existeError(res, error, 'salasPost');
  }
};

const salasActualizarPost = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await salasDB.postSalasActualizar(req.usuario.ID_USUARIO, req.body)
      );
  } catch (error) {
    existeError(res, error, 'salasActualizarPost');
  }
};

module.exports = {
  salaGet,
  salasGet,
  salasPost,
  salasActualizarPost,
};
