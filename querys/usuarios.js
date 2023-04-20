const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();

const getUsuariosDB = async (page = 1) => {
  const usuarios = await prisma.USUARIOS.findMany({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      PATERNO: true,
      MATERNO: true,
      TIPO_USUARIO: true,
      EMAIL: true,
      APODO: true,
    },
  });

  return usuarios;
};

const postUsuariosDB = async (usuario) => {
  const { password, email } = usuario;

  // Verificar si el correo existe
  const usuarioExiste = await prisma.USUARIOS.findFirst({
    where: {
      EMAIL: email,
    },
  });

  if (usuarioExiste)
    return { msg: 'El usuario ya se encuentra en la base de datos' };

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  const usuarioDB = await prisma.USUARIOS.create({
    data: {
      NOMBRE: usuario.nombre,
      PATERNO: usuario.paterno,
      MATERNO: usuario.materno,
      FECHA_NAC: new Date(usuario.nacimiento),
      TIPO_USUARIO: usuario.tipo,
      EMAIL: usuario.email,
      PWD: usuario.password,
      FECHA_ALTA: new Date(),
      APODO: usuario.apodo,
      FOTO: usuario.foto,
      NIVEL: usuario.nivel,
    },
  });

  return usuarioDB;
};

const loginUser = async (email, password) => {
  // Verificar si el correo existe
  const usuarioExiste = await prisma.USUARIOS.findFirst({
    where: {
      EMAIL: email,
    },
  });

  if (!usuarioExiste) return { msg: 'Datos invalidos' };

  // Comparar contraseñas con la base de datos
  let comparacionContra = bcryptjs.compareSync(password, usuarioExiste.PWD);
  if (comparacionContra) return usuarioExiste;
  return { msg: 'Datos invalidos' };
};

const patchUsuarioDB = ({ id, username, password }) => {};

async function putUsuarioDB({ id, username, password }) {}

async function deleteUsuarioDB({ id }) {}

module.exports = {
  getUsuariosDB,
  postUsuariosDB,
  loginUser,
};
