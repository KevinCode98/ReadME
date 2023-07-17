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
      estado: null,
    };
  }

  // Si el usuario tiene un estado valido
  if (usuario.STATUS === 'ELIMINADO') {
    return {
      estado: null,
    };
  }

  // Verificar el password
  const validarPassword = bcryptjs.compareSync(password, usuario.PWD);
  if (!validarPassword) {
    return {
      estado: null,
    };
  }

  // Generar el JWT
  const token = await generarJWT(usuario.ID_USUARIO);
  delete usuario.PWD;

  return {
    estado: 'Ok',
    usuario,
    token,
  };
};

module.exports = {
  postAuth,
};
