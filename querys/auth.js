const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const prisma = new PrismaClient();

const postAuth = async (email, password) => {
  // Verificar si el email existe
  const usuario = await prisma.USUARIOS.findFirst({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      PWD: true,
      APELLIDOS: true,
      TIPO_USUARIO: true,
      EMAIL: true,
      APODO: true,
      FOTO: true,
      NIVEL: true,
      STATUS: true,
    },
    where: {
      EMAIL: email,
    },
  });

  if (!usuario) {
    return {
      msg: 'Error de datos',
    };
  }

  // Si el usuario tiene un msg valido
  if (usuario.STATUS === 'ELIMINADO') {
    return {
      msg: 'Error de datos',
    };
  }

  // Verificar el password
  const validarPassword = bcryptjs.compareSync(password, usuario.PWD);
  if (!validarPassword) {
    return {
      msg: 'Error de datos',
    };
  }

  // Generar el JWT
  const token = await generarJWT(usuario.ID_USUARIO);
  delete usuario.PWD;

  return {
    usuario,
    token,
  };
};

module.exports = {
  postAuth,
};
