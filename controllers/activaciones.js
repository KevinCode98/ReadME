const { response } = require('express');
const activacionesDB = require('../querys/activaciones');
const usuariosDB = require('../querys/usuarios');
const { existeError } = require('../helpers/validator');
const { enviarCorreo } = require('../helpers/enviar-correo');

const actualizarActivacionPost = async (req, res = response) => {
  try {
    const activacion = await activacionesDB.postActualizarCodigo(
      req.usuario.ID_USUARIO,
      req.body.tiempoCliente
    );

    if (!activacion) return res.status(400).json({ validacion: 'ERROR' });

    const usuario = await usuariosDB.getUsuario(req.usuario.ID_USUARIO);
    // Enviar correo
    const datosCorreo = {
      from: process.env.EMAIL_GMAIL,
      to: usuario.EMAIL,
      subject: 'Validacion de codigo',
      text: `Codigo de confirmacion: ${activacion.CODIGO}`,
    };

    enviarCorreo(datosCorreo);
    res.status(200).json({ validacion: 'ACTUALIZADO' });
  } catch (error) {
    existeError(res, error, 'actualizarActivacionPost');
  }
};

const validarActivacionPost = async (req, res = response) => {
  try {
    const activacion = await activacionesDB.postValidarActivacion(
      req.usuario.ID_USUARIO,
      req.body.codigo,
      req.body.tiempoCliente
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
