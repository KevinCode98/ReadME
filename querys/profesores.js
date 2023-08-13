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

module.exports = {
  getNombresProfesores,
  getProfesor,
  getProfesores,
  getProfesorSalas,
};
