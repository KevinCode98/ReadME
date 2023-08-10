const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAlumnos = async () => {
  const alumnos = await prisma.USUARIOS.findMany({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDOS: true,
      EMAIL: true,
      APODO: true,
    },
    where: {
      TIPO_USUARIO: 'Alumno',
    },
  });

  return alumnos;
};

const getNombresAlumnos = async (buscar) => {
  const alumnos = await prisma.USUARIOS.findMany({
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
          TIPO_USUARIO: 'Alumno',
        },
      ],
    },
  });

  return alumnos;
};

const getAlumno = async (id) => {
  const alumno = await prisma.USUARIOS.findFirst({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDOS: true,
      EMAIL: true,
      APODO: true,
    },
    where: {
      TIPO_USUARIO: 'Alumno',
      ID_USUARIO: Number(id),
    },
  });

  return alumno;
};

module.exports = {
  getAlumno,
  getAlumnos,
  getNombresAlumnos,
};
