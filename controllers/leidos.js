const { response } = require('express');
const leidosDB = require('../querys/leidos');

const leidosGet = async (req, res = response) => {
  try {
    res.status(200).json(await leidosDB.getLeido(req.params.id));
  } catch (error) {
    console.error('Error en la petición de base de datos - leidosGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - leidosGet',
    });
  }
};

const leidosPost = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await leidosDB.postLeido(req.body, req.usuario.ID_USUARIO));
  } catch (error) {
    console.error('Error en la petición de base de datos - leidosPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - leidosPost',
    });
  }
};

module.exports = {
  leidosGet,
  leidosPost,
};
