const { response } = require('express');
const alarmasDB = require('../querys/alarmas');

const alarmaGet = async (req, res = response) => {
  try {
    res.status(200).json(await alarmasDB.getAlarma(req.params.id_alarma));
  } catch (error) {
    console.error('Error en la petición de base de datos - alarmasPorIdGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - alarmasPorIdGet',
    });
  }
};

const alarmasPorIdGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await alarmasDB.getAlarmasPorID(req.usuario.ID_USUARIO));
  } catch (error) {
    console.error('Error en la petición de base de datos - alarmasPorIdGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - alarmasPorIdGet',
    });
  }
};

const alarmaPost = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await alarmasDB.postAlarma(req.body, req.usuario.ID_USUARIO));
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de base de datos - alarmaPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - alarmaPost',
    });
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
    console.error('Error en la petición de base de datos - alarmaDelete');
    return res.status(500).json({
      msg: 'Hable con el administrador - alarmaDelete',
    });
  }
};

module.exports = {
  alarmaGet,
  alarmasPorIdGet,
  alarmaPost,
  alarmaDelete,
};
