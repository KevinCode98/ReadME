const { response, request } = require('express');
const usuarioDB = require('../querys/usuarios');

const usuariosGet = async (req, res = response) => {
  try {
    res.json(await usuarioDB.getUsuarios());
  } catch (error) {
    console.error('Error en la petición de base de datos - usuariosGet');
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

module.exports = {
  usuariosGet,
  usuarioGet,
};
