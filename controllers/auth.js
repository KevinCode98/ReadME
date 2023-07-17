const { response, request } = require('express');
const authDB = require('../querys/auth');

const authPost = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    usuario = await authDB.postAuth(email, password);

    if (!usuario.estado)
      return res.status(400).json({
        msg: 'Datos invalidos',
      });

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error en la petición de base de datos - authPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - authPost',
    });
  }
};

module.exports = {
  authPost,
};
