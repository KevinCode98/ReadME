const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

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

const getNombresUsuarios = async (buscar) => {
  const usuarios = await prisma.USUARIOS.findMany({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDOS: true,
      EMAIL: true,
      APODO: true,
    },
    where: {
      OR: [
        {
          NOMBRE: {
            contains: buscar,
          },
        },
        {
          APELLIDOS: {
            contains: buscar,
          },
        },
        {
          EMAIL: {
            contains: buscar,
          },
        },
      ],
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

const postUsuario = async (usuario, pathCompleto) => {
  //
  const { email, password, apodo } = usuario;

  // Verificar si el correo existe
  const usuarioExisteCorreo = await prisma.USUARIOS.findFirst({
    where: {
      EMAIL: email,
    },
  });

  if (usuarioExisteCorreo)
    return {
      msg: 'El correo ya se encuentra en la base de datos',
    };

  // Verificar si el apodo existe
  const usuarioExisteApodo = await prisma.USUARIOS.findFirst({
    where: {
      APODO: apodo,
    },
  });

  if (usuarioExisteApodo)
    return {
      msg: 'El apodo ya se encuentra en la base de datos',
    };

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  const usuarioDB = await prisma.USUARIOS.create({
    data: {
      NOMBRE: usuario.nombre,
      APELLIDOS: usuario.apellidos,
      FECHA_NAC: new Date(usuario.nacimiento),
      TIPO_USUARIO: usuario.tipo_usuario,
      EMAIL: usuario.email,
      PWD: usuario.password,
      FECHA_ALTA: new Date(),
      APODO: usuario.apodo,
      FOTO: pathCompleto,
      NIVEL: 'BRONCE',
      STATUS: 'CREADO',
    },
  });

  delete usuarioDB.PWD;
  // Generar el JWT
  const token = await generarJWT(usuarioDB.ID_USUARIO);

  return { usuarioDB, token };
};

const postUsuarioActializar = async (usuario, id) => {
  const { apodo } = usuario;

  // Verificar si el apodo existe
  const usuarioExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(id),
    },
  });

  const usuarioExisteApodo = await prisma.USUARIOS.findFirst({
    where: {
      APODO: apodo,
    },
  });

  if (usuarioExiste.APODO != apodo && usuarioExisteApodo)
    return {
      msg: 'El apodo ya se encuentra en la base de datos',
    };

  //Guardar en BD
  const usuarioDB = await prisma.USUARIOS.update({
    data: {
      NOMBRE: usuario.nombre,
      APELLIDOS: usuario.apellidos,
      FECHA_NAC: new Date(usuario.nacimiento),
      APODO: usuario.apodo,
      FOTO: usuario.foto,
    },
    where: {
      ID_USUARIO: Number(id),
    },
  });

  return { valiacion: true };
};

const postPasswordActializar = async (password, id) => {
  const valoresCodigo = await prisma.ACTIVACIONES.findFirst({
    where: {
      ID_USUARIO: Number(id),
    },
  });

  if (valoresCodigo) {
    return { msg: 'El usuario cuenta con un codigo de validacion' };
  }

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  password = bcryptjs.hashSync(password, salt);

  const usuario = await prisma.USUARIOS.update({
    data: {
      PWD: password,
    },
    where: {
      ID_USUARIO: Number(id),
    },
  });

  return usuario;
};

const deleteUsuario = async (id) => {
  const usuario = await prisma.USUARIOS.update({
    where: {
      ID_USUARIO: Number(id),
    },
    data: {
      STATUS: 'ELIMINADO',
    },
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDOS: true,
      EMAIL: true,
      APODO: true,
    },
  });

  return usuario;
};

module.exports = {
  deleteUsuario,
  getNombresUsuarios,
  getUsuario,
  getUsuarios,
  postPasswordActializar,
  postUsuario,
  postUsuarioActializar,
};
