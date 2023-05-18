const { response, request } = require('express');
const usuarioDB = require('../querys/usuarios');
const { validationResult } = require('express-validator');

const usuariosGet = async (req, res = response) => {
  try {
    res.json(await usuarioDB.getUsuarios());
  } catch (error) {
    console.error('Error en la petición de base de datos - usuariosGet');
  }
};

const usuariosPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    res.json(await usuarioDB.postUsuariosDB(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - usuariosPost');
  }
};

const loginUser = async (req, res = response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json(errors);

  const { email, password } = req.body;

  try {
    return res.json(await usuarioDB.loginUser(email, password));
  } catch (error) {
    console.error('Error en la petición de base de datos - loginUser');
  }
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: 'Put API - controlador',
    id,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'Patch API - controlador',
  });
};

const usuarioGet = async (req, res = response) => {
  const id = req.params.id;
  try {
    return res.json(await usuarioDB.getUsuario(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - usuarioGet');
  }
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'Delete API - controlador',
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuarioGet,
  loginUser,
};
