const { PrismaClient } = require('@prisma/client');
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

const getNombresProfesores = async (buscar) => {
  const profesores = await prisma.USUARIOS.findMany({
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
      AND: [
        {
          TIPO_USUARIO: 'Profesor',
        },
      ],
    },
  });

  return profesores;
};

const getProfesor = async (id) => {
  const profesor = await prisma.USUARIOS.findFirst({
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

const getProfesorSalas = async (id) => {
  const salas = await prisma.SALAS.findMany({
    where: {
      ID_RESPONSABLE: Number(id),
    },
  });

  return salas;
};

const getProfesorSalaInscritos = async (id, sala) => {
  // validar que el Profesor exista
  const profesorExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(id),
      TIPO_USUARIO: 'Profesor',
    },
  });

  if (!profesorExiste)
    return { msg: 'El Profesor no se encuentra en la base de datos' };

  // validar que el Profesor sea dueño de la Sala
  const salaExiste = await prisma.SALAS.findFirst({
    where: {
      ID_RESPONSABLE: Number(id),
      ID_SALA: Number(sala),
    },
  });

  if (!salaExiste) return { msg: 'El Profesor no es propietario de la sala' };

  const alumnos = await prisma.INSCRITOS.findMany({
    where: {
      ID_SALA: Number(sala),
    },
    select: {
      ACEPTADO: true,
      USUARIOS: {
        NOMBRE: true,
        APELLIDOS: true,
        FOTO: true,
        NIVEL: true,
      },
    },
  });

  return alumnos;
};

module.exports = {
  getNombresProfesores,
  getProfesor,
  getProfesores,
  getProfesorSalas,
};
