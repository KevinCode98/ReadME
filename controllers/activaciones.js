const { response, request } = require('express');
const activacionesDB = require('../querys/activaciones');

const actualizarActivacionPost = async (req, res = response) => {
  const id = req.usuario.ID_USUARIO;

  try {
    res.json(await activacionesDB.postActualizarCodigo(id));
  } catch (error) {
    console.error(
      'Error en la petición de base de datos - actualizarActivacionPost'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - actualizarActivacionPost',
    });
  }
};

const validarActivacionPost = async (req, res = response) => {
  const id = req.usuario.ID_USUARIO;
  const codigo = req.body.codigo;

  try {
    res.json(await activacionesDB.postValidarActivacion(id, codigo));
  } catch (error) {
    console.error(
      'Error en la petición de base de datos - validarActivacionPost'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - validarActivacionPost',
    });
  }
};

module.exports = {
  actualizarActivacionPost,
  validarActivacionPost,
};
