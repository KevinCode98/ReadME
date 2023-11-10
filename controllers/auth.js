const { response } = require('express');
const { existeError } = require('../helpers/validator');
const authDB = require('../querys/auth');

const authPost = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    usuario = await authDB.postAuth(email, password);

    if (usuario.msg) return res.status(400).json(usuario);
    res.status(200).json(usuario);
  } catch (error) {
    existeError(res, error, 'authPost');
  }
};

module.exports = {
  authPost,
};
