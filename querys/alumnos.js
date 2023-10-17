const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAlumnos = async () => {
  return await prisma.USUARIOS.findMany({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDOS: true,
      EMAIL: true,
      APODO: true,
    },
    where: {
      TIPO_USUARIO: 'Alumno',
      STATUS: 'ONLINE',
    },
  });
};

const getNombresAlumnos = async (buscar) => {
  return await prisma.USUARIOS.findMany({
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
          STATUS: 'ONLINE',
        },
      ],
    },
  });
};

const getAlumno = async (id) => {
  return await prisma.USUARIOS.findFirst({
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
};

const getAlumnoSalasInscritas = async (id) => {
  return await prisma.INSCRITOS.findMany({
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
};

const getInscripcion = async (id, sala) => {
  return await prisma.INSCRITOS.findFirst({
    where: {
      ID_USUARIO: Number(id),
      ID_SALA: Number(sala),
      ACEPTADO: 'NO_ACEPTADO',
    },
    select: {
      ID_INSCRITOS: true,
    },
  });
};

const postAlumnoAceptarSala = async (id, sala) => {
  const inscritosExiste = await getInscripcion(id, sala);

  if (!inscritosExiste)
    return { msg: 'La peticion no existe en la base de datos' };

  return await prisma.INSCRITOS.update({
    where: {
      ID_INSCRITOS: Number(inscritosExiste.ID_INSCRITOS),
    },
    data: {
      ACEPTADO: 'ACEPTADO',
    },
  });
};

const deleteAlumnoCancelarSala = async (id, sala) => {
  const inscritosExiste = await getInscripcion(id, sala);

  if (!inscritosExiste)
    return { msg: 'La peticion no existe en la base de datos' };

  return await prisma.INSCRITOS.delete({
    where: {
      ID_INSCRITOS: Number(inscritosExiste.ID_INSCRITOS),
    },
  });
};

module.exports = {
  getAlumno,
  getAlumnos,
  getNombresAlumnos,
  getAlumnoSalasInscritas,
  postAlumnoAceptarSala,
  deleteAlumnoCancelarSala,
};
