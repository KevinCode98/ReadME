const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
  const { page = 1, limit = 5 } = req.query;
  res.status(200).json({
    msg: 'Get API - controlador',
    page,
    limit,
  });
};

const usuariosPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: 'Post API - controlador',
    nombre,
    edad,
  });
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

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'Delete API - controlador',
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
