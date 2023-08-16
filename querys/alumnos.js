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

const getAlumnoSalasInscritas = async (id) => {
  // Validar que el Alunno exista
  const alumnoExiste = await getAlumno(id);

  if (!alumnoExiste) return { msg: 'El Alumno no existe en la base de datos' };

  const salas = await prisma.INSCRITOS.findMany({
    select: {
      ACEPTADO: true,
      SALAS: {
        select: {
          ID_SALA: true,
          DESCRIPCION: true,
          USUARIOS: {
            select: {
              ID_USUARIO: true,
              NOMBRE: true,
              FOTO: true,
              APELLIDOS: true,
            },
          },
        },
      },
    },
    where: {
      ID_USUARIO: Number(id),
    },
  });

  return salas;
};

module.exports = {
  getAlumno,
  getAlumnos,
  getNombresAlumnos,
  getAlumnoSalasInscritas,
};
