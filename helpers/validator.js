const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();

const existeUsuarioPorId = async (id) => {
  // verificar si el usuario existe
  const usuario = await prisma.USUARIOS.findFirst({
    select: {
      ID_USUARIO: true,
    },
    where: {
      ID_USUARIO: Number(id),
    },
  });

  if (!usuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

const existeUsuarioPorEmail = async (email) => {
  // verificar si el usuario existe
  const usuario = await prisma.USUARIOS.findFirst({
    select: {
      ID_USUARIO: true,
      EMAIL: true,
    },
    where: {
      EMAIL: email,
    },
  });

  if (usuario) {
    throw new Error(`El email ${email} ya existe en la DB`);
  }
};

module.exports = {
  existeUsuarioPorId,
  existeUsuarioPorEmail,
};
