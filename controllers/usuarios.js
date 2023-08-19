const { response, request } = require('express');
const usuarioDB = require('../querys/usuarios');
const activacionDB = require('../querys/activaciones');
const { subirArchivo } = require('../helpers/subir-archivo');

const usuariosGet = async (req, res = response) => {
  try {
    res.json(await usuarioDB.getUsuarios());
  } catch (error) {
    console.error('Error en la petición de base de datos - usuariosGet');
  }
};

const usuariosNombreGet = async (req, res = response) => {
  const nombre = req.query.nombre;

  try {
    if (Object.keys(nombre).length == 0)
      return res.json(await usuarioDB.getUsuarios());
    else return res.json(await usuarioDB.getNombresUsuarios(nombre));
  } catch (error) {
    console.error('Error en la petición de base de datos - usuariosNombreGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - usuariosNombreGet',
    });
  }
};

const usuarioGet = async (req, res = response) => {
  const id = req.params.id;
  try {
    return res.json(await usuarioDB.getUsuario(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - usuarioGet');
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

    console.log(pathCompleto);
    const usuario = await usuarioDB.postUsuario(req.body, pathCompleto);
    if (usuario.msg) return res.status(400).json(usuario);

    // Ingresar el codigo de validacion
    const activacion = await activacionDB.postActualizarCodigo(
      usuario.usuarioDB.ID_USUARIO
    );
    if (activacion.msg) return res.status(400).json(usuario);

    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de la base de datos - usuarioPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - usuarioPost',
    });
  }
};

const usuarioActializarPost = async (req, res = response) => {
  const id = req.params.id;
  const usuarioAutenticado = req.usuario;

  try {
    if (Number(id) !== Number(usuarioAutenticado.ID_USUARIO)) {
      return res.status(401).json({
        msg: `El ID ${usuarioAutenticado.ID_USUARIO} no es el propietario de la cuenta`,
      });
    }

    // Ingresar el usuario a la Base de Datos
    const usuario = await usuarioDB.postUsuarioActializar(req.body, id);
    if (usuario.msg) return res.status(400).json(usuario);
    res.status(200).json(usuario);
  } catch (error) {
    console.error(
      'Error en la petición de la base de datos - usuarioActializarPost'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - usuarioActializarPost',
    });
  }
};

const usuarioPasswordPost = async (req, res = response) => {
  const id = req.params.id;
  const usuarioAutenticado = req.usuario;

  try {
    if (Number(id) !== Number(usuarioAutenticado.ID_USUARIO)) {
      return res.status(401).json({
        msg: `El ID ${usuarioAutenticado.ID_USUARIO} no es el propietario de la cuenta`,
      });
    }

    // Ingresar el usuario a la Base de Datos
    const usuario = await usuarioDB.postUsuarioActializar(req.body, id);
    if (usuario.msg) return res.status(400).json(usuario);
    res.status(200).json(usuario);
  } catch (error) {
    console.error(
      'Error en la petición de la base de datos - usuarioActializarPost'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - usuarioActializarPost',
    });
  }
};

const usuarioDelete = async (req, res = response) => {
  const id = req.params.id;
  const usuarioAutenticado = req.usuario;

  try {
    if (Number(id) !== Number(usuarioAutenticado.ID_USUARIO)) {
      return res.status(401).json({
        msg: `El ID ${usuarioAutenticado.ID_USUARIO} no es el propietario de la cuenta`,
      });
    }

    res.json(await usuarioDB.deleteUsuario(id));
  } catch (error) {
    console.error('Error enl a petición de la base de datos - usuarioDelete');
    return res.status(500).json({
      msg: 'Hable con el administrador - usuarioDelete',
    });
  }
};

module.exports = {
  usuarioActializarPost,
  usuarioDelete,
  usuarioGet,
  usuarioPost,
  usuariosGet,
  usuariosNombreGet,
  usuarioPasswordPost,
};
