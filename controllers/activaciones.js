const { response, request } = require('express');
const activacionesDB = require('../querys/activaciones');

const actualizarActivacionPost = async (req, res = response) => {
  const id = req.usuario.ID_USUARIO;

  try {
    const activacion = await activacionesDB.postActualizarCodigo(id);
    if (activacion.msg) return res.status(400).json(activacion);

    res.status(200).json(activacion);
  } catch (error) {
    console.log(error);
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
    const activacion = await activacionesDB.postValidarActivacion(id, codigo);
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
