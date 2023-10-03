const { response } = require('express');
const activacionesDB = require('../querys/activaciones');

const actualizarActivacionPost = async (req, res = response) => {
  try {
    const activacion = await activacionesDB.postActualizarCodigo(
      req.usuario.ID_USUARIO
    );
    if (activacion.msg) return res.status(400).json(activacion);

    res.status(200).json(activacion);
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
  try {
    const activacion = await activacionesDB.postValidarActivacion(
      req.usuario.ID_USUARIO,
      req.body.codigo
    );
    if (activacion.msg) return res.status(400).json(activacion);

    res.status(200).json(activacion);
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
