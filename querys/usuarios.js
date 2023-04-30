const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();

const usuariosGet = async () => {
  const usuarios = await prisma.USUARIOS.findMany({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDO: true,
      TIPO_USUARIO: true,
      EMAIL: true,
      APODO: true,
    },
  });

  return usuarios;
};

const usuarioGet = async (id) => {
  const usuario = await prisma.USUARIOS.findMany({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDO: true,
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

const loginUser = async (email, password) => {
  // Verificar si el correo existe
  const usuarioExiste = await prisma.USUARIOS.findFirst({
    where: {
      EMAIL: email,
    },
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDO: true,
      TIPO_USUARIO: true,
      EMAIL: true,
      PWD: true,
      APODO: true,
    },
  });

  if (!usuarioExiste) return { msg: 'Datos invalidos' };

  // Comparar contraseñas con la base de datos
  let comparacionContra = bcryptjs.compareSync(password, usuarioExiste.PWD);
  if (comparacionContra) {
    delete usuarioExiste.PWD;
    return usuarioExiste;
  }
  return { msg: 'Datos invalidos' };
};

async function deleteUsuarioDB({ id }) {}

module.exports = {
  loginUser,
  usuarioGet,
  usuariosGet,
};
