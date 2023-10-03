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
      STATUS: 'ONLINE',
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
          STATUS: 'ONLINE',
        },
      ],
    },
  });

  return profesores;
};

const getProfesor = async (id) => {
  return await prisma.USUARIOS.findFirst({
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
};

const getProfesorSalas = async (id) => {
  return await prisma.SALAS.findMany({
    where: {
      ID_RESPONSABLE: Number(id),
    },
  });
};

const getProfesorSalaInscritos = async (id, sala) => {
  // validar que el Profesor exista
  const profesorExiste = await getProfesor(id);

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
        select: {
          NOMBRE: true,
          APELLIDOS: true,
          FOTO: true,
          NIVEL: true,
        },
      },
    },
  });

  return alumnos;
};

const postProfesorEliminarInscrito = async (inscrito, id_profesor) => {
  // Validar que el Profesor que se incribira solamente puede ser Alumno
  const profesorExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(id_profesor),
      TIPO_USUARIO: 'Profesor',
    },
  });
  if (!profesorExiste)
    return { msg: 'El Profesor no existe en la base de datos' };

  // Validar que el usuario que se incribira solamente puede ser Alumno
  const alumnoExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(inscrito.id_usuario),
      TIPO_USUARIO: 'Alumno',
    },
  });
  if (!alumnoExiste) return { msg: 'El Alumno no existe en la base de datos' };

  // Validar que el sala que se incribira solamente puede ser Alumno
  const salaExiste = await prisma.SALAS.findFirst({
    where: {
      ID_SALA: Number(inscrito.id_sala),
    },
  });
  if (!salaExiste) return { msg: 'La Sala no existe en la base de datos' };

  await prisma.INSCRITOS.update({
    data: {
      ACEPTADO: 'ELIMINADO',
    },
  });

  // Eliminar los datos del Alumno dentro de la Sala
  // TODO: Eliminar todos los valores del alumno
};

module.exports = {
  getNombresProfesores,
  getProfesor,
  getProfesores,
  getProfesorSalas,
  getProfesorSalaInscritos,
  postProfesorEliminarInscrito,
};
