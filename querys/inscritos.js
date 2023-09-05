const { PrismaClient } = require('@prisma/client');
const { isUint8ClampedArray } = require('util/support/types');

const prisma = new PrismaClient();

const getInscritos = async (id) => {
  const inscritos = await prisma.INSCRITOS.findMany({
    select: {
      ID_SALA: true,
      ID_USUARIO: true,
      ACEPTADO: true,
    },
    where: {
      ID_SALA: Number(id),
    },
  });

  return inscritos;
};

const postInscritos = async (inscrito, id_profesor) => {
  // Validar que el usuario que se incribira solamente puede ser Alumno
  const alumnoExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(inscrito.id_usuario),
      TIPO_USUARIO: 'Alumno',
    },
  });

  if (!alumnoExiste) return { msg: 'El Alumno no existe en la base de datos' };

  // Validar que el usuario que se incribira solamente puede ser Alumno
  const profesorExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(id_profesor),
      TIPO_USUARIO: 'Profesor',
    },
  });

  if (!profesorExiste)
    return { msg: 'El Profesor no existe en la base de datos' };

  // Validar que la Sala exista en la base de datos
  const salaExiste = await prisma.SALAS.findFirst({
    where: {
      ID_SALA: Number(inscrito.id_sala),
      ID_RESPONSABLE: Number(id_profesor),
    },
  });

  if (!salaExiste) return { msg: 'La Sala no existe en la base de datos' };
  // Validar que la Inscripcion no exista en la base de datos
  const inscripcionExiste = await prisma.INSCRITOS.findFirst({
    where: {
      ID_SALA: Number(inscrito.id_sala),
      ID_USUARIO: Number(inscrito.id_usuario),
    },
  });

  if (inscripcionExiste)
    return { msg: 'La invitacion ya existe en la base de datos' };

  const inscritoDB = await prisma.INSCRITOS.create({
    data: {
      SALAS: {
        connect: {
          ID_SALA: Number(inscrito.id_sala),
        },
      },
      USUARIOS: {
        connect: {
          ID_USUARIO: Number(inscrito.id_usuario),
        },
      },
    },
  });

  return inscritoDB;
};

const postEliminarInscritos = async (inscrito, id_profesor) => {
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
  getInscritos,
  postInscritos,
  postEliminarInscritos,
};
