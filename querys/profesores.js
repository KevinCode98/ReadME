const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const prisma = new PrismaClient();

const getProfesores = async () => {
  const profesores = await prisma.USUARIOS.findMany({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDOS: true,
      EMAIL: true,
      APODO: true,
    },
    where: {
      TIPO_USUARIO: 'Profesor',
    },
  });

  return profesores;
};

const getProfesor = async (id) => {
  const profesor = await prisma.USUARIOS.findMany({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDOS: true,
      EMAIL: true,
      APODO: true,
    },
    where: {
      TIPO_USUARIO: 'Profesor',
      ID_USUARIO: Number(id),
    },
  });

  return profesor;
};

const postProfesor = async (profesor) => {
  const { email, password } = profesor;

  // Verificar si el correo existe
  const profesorExiste = await prisma.USUARIOS.findFirst({
    where: {
      EMAIL: email,
    },
  });

  if (profesorExiste)
    return { msg: 'El usuario ya se encuentra en la base de datos' };

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  profesor.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  const profesorDB = await prisma.USUARIOS.create({
    data: {
      NOMBRE: profesor.nombre,
      APELLIDOS: profesor.apellidos,
      FECHA_NAC: new Date(profesor.nacimiento),
      TIPO_USUARIO: 'Profesor',
      EMAIL: profesor.email,
      PWD: profesor.password,
      FECHA_ALTA: new Date(),
      APODO: profesor.apodo,
      FOTO: profesor.foto,
      NIVEL: 'BRONCE',
      STATUS: 'CREADO',
    },
  });

  delete profesorDB.PWD;
  // Generar el JWT
  const token = await generarJWT(profesorDB.ID_USUARIO);

  return { profesorDB, token };
};

const deleteProfesor = async (id) => {
  const profesor = await prisma.USUARIOS.update({
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

  return profesor;
};

module.exports = {
  getProfesores,
  getProfesor,
  postProfesor,
  deleteProfesor,
};
