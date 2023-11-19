const { response } = require('express');
const { existeError } = require('../helpers/validator');
const usuarioDB = require('../querys/usuarios');
const activacionDB = require('../querys/activaciones');
const { subirArchivo } = require('../helpers/subir-archivo');
const { enviarCorreo } = require('../helpers/enviar-correo');

const usuariosGet = async (req, res = response) => {
  try {
    res.status(200).json(await usuarioDB.getUsuarios());
  } catch (error) {
    existeError(res, error, 'usuariosGet');
  }
};

const usuariosNombreGet = async (req, res = response) => {
  try {
    if (Object.keys(req.query.nombre).length == 0)
      return res.json(await usuarioDB.getUsuarios());
    else return res.json(await usuarioDB.getNombresUsuarios(req.query.nombre));
  } catch (error) {
    existeError(res, error, 'usuariosNombreGet');
  }
};

const usuarioGet = async (req, res = response) => {
  try {
    return res.json(await usuarioDB.getUsuario(req.params.id));
  } catch (error) {
    existeError(res, error, 'usuarioGet');
  }
};

const usuarioPost = async (req, res = response) => {
  try {
    // Ingresar el usuario a la Base de Datos
    // TODO: Validar si el alumno es menor de 12 años solicitar TUTOR -> Despues
    const pathCompleto = await subirArchivo(
      req.files,
      ['png', 'jpg', 'jpeg'],
      'perfil'
    );

    const usuario = await usuarioDB.postUsuario(req.body, pathCompleto);
    if (usuario.msg) return res.status(400).json(usuario);

    // Ingresar el codigo de validacion
    const activacion = await activacionDB.postActualizarCodigo(
      usuario.usuarioDB.ID_USUARIO,
      usuario.usuarioDB.FECHA_ALTA
    );

    if (activacion.msg) return res.status(400).json(usuario);

    // Enviar correo
    const datosCorreo = {
      from: process.env.EMAIL_GMAIL,
      to: usuario.usuarioDB.EMAIL,
      subject: 'Validacion de codigo',
      text: `Codigo de confirmacion: ${activacion.CODIGO}`,
    };

    enviarCorreo(datosCorreo);
    res.status(200).json(usuario);
  } catch (error) {
    existeError(res, error, 'usuarioPost');
  }
};

const usuarioActializarPost = async (req, res = response) => {
  try {
    if (Number(req.params.id) !== Number(req.usuario.ID_USUARIO)) {
      return res.status(401).json({
        msg: `El ID ${req.usuario.ID_USUARIO} no es el propietario de la cuenta`,
      });
    }

    // Ingresar el usuario a la Base de Datos
    const usuario = await usuarioDB.postUsuarioActializar(
      req.body,
      req.params.id
    );

    if (usuario.msg) return res.status(400).json(usuario);
    res.status(200).json(usuario);
  } catch (error) {
    existeError(res, error, 'usuarioActializarPost');
  }
};

const usuarioPasswordSolicitudPost = async (req, res = response) => {
  try {
    // Obtener los datos del usuario
    const usuario = await usuarioDB.getUsuario(req.usuario.ID_USUARIO);

    // Ingresar el codigo de validacion
    const activacion = await activacionDB.postActualizarCodigo(
      req.usuario.ID_USUARIO,
      req.body.tiempoCliente
    );

    // Enviar correo
    const datosCorreo = {
      from: process.env.EMAIL_GMAIL,
      to: usuario.EMAIL,
      subject: 'Validacion de codigo',
      text: `Codigo de confirmacion: ${activacion.CODIGO}`,
    };

    enviarCorreo(datosCorreo);
    res.status(200).json(activacion);
  } catch (error) {
    existeError(res, error, 'usuarioPasswordSolicitudPost');
  }
};

const usuarioPasswordPost = async (req, res = response) => {
  try {
    if (Number(req.params.id) !== Number(req.usuario.ID_USUARIO)) {
      return res.status(401).json({
        msg: `El ID ${req.usuario.ID_USUARIO} no es el propietario de la cuenta`,
      });
    }

    if (await activacionDB.getValidacion(req.usuario.ID_USUARIO))
      return res.status(400).json({
        msg: `El Usuario cuenta con una activacion`,
      });

    // Ingresar el usuario a la Base de Datos
    const usuario = await usuarioDB.postPasswordActializar(
      req.body,
      req.params.id
    );
    if (usuario.msg) return res.status(400).json(usuario);
    res.status(200).json(usuario);
  } catch (error) {
    existeError(res, error, 'usuarioPasswordPost');
  }
};

const usuarioDelete = async (req, res = response) => {
  try {
    if (Number(req.params.id) !== Number(req.usuario.ID_USUARIO)) {
      return res.status(401).json({
        msg: `El ID ${req.usuario.ID_USUARIO} no es el propietario de la cuenta`,
      });
    }

    res.json(await usuarioDB.deleteUsuario(req.params.id));
  } catch (error) {
    existeError(res, error, 'usuarioDelete');
  }
};

module.exports = {
  usuarioActializarPost,
  usuarioDelete,
  usuarioGet,
  usuarioPasswordPost,
  usuarioPasswordSolicitudPost,
  usuarioPost,
  usuariosGet,
  usuariosNombreGet,
};
