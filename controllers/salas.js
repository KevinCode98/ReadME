const { response } = require('express');
const salasDB = require('../querys/salas');

const salasGet = async (req, res = response) => {
  try {
    res.json(await salasDB.getSalas());
  } catch (error) {
    console.error('Error en la petición de base de datos - salasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - salasGet',
    });
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
    console.error('Error en la petición de base de datos - salaGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - salaGet',
    });
  }
};

const salasPost = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await salasDB.postSalas(req.usuario.ID_USUARIO, req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - salasPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - salasPost',
    });
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
    console.error('Error en la petición de base de datos - salasPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - salasPost',
    });
  }
};

module.exports = {
  salaGet,
  salasGet,
  salasPost,
  salasActualizarPost,
};
