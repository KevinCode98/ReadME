const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();

const getUsuarios = async () => {
  const usuarios = await prisma.USUARIOS.findMany({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDOS: true,
      TIPO_USUARIO: true,
      EMAIL: true,
      APODO: true,
    },
  });

  return usuarios;
};

const getUsuario = async (id) => {
  const usuario = await prisma.USUARIOS.findMany({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDOS: true,
      TIPO_USUARIO: true,
      EMAIL: true,
      APODO: true,
    },
    where: {
      ID_USUARIO: Number(id),
    },
  });

  return usuario;
};

module.exports = {
  getUsuario,
  getUsuarios,
};
