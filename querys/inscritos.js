const { PrismaClient } = require('@prisma/client');

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

const postInscritos = async (inscrito) => {
  // Validar que el usuario que se incribira solamente puede ser Alumno
  const alumnoExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(inscrito.id_alumno),
      TIPO_USUARIO: 'Alumno',
    },
  });

  if (!alumnoExiste) return { msg: 'El Alumno no existe en la base de datos' };

  const inscripcionExiste = await prisma.INSCRITOS.findFirst({
    where: {
      ID_SALA: Number(inscrito.id_sala),
      ID_USUARIO: Number(inscrito.id_alumno),
    },
  });

  if (inscripcionExiste)
    return { msg: 'La invitacion ya existe en la base de datos' };

  const salaExiste = await prisma.SALAS.findFirst({
    where: { ID_SALA: Number(inscrito.id_sala) },
  });

  const inscritoDB = await prisma.INSCRITOS.create({
    data: {
      ID_SALA: Number(inscrito.id_sala),
      ID_USUARIO: Number(inscrito.id_alumno),
    },
  });

  return { inscritoDB, salaExiste };
};

const postEliminarInscritos = async (inscrito, id_profesor) => {
  // Validar que el usuario que se incribira solamente puede ser Alumno
  const alumnoExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(inscrito.id_usuario),
      TIPO_USUARIO: 'Alumno',
    },
  });
  if (!alumnoExiste) return { msg: 'El Alumno no existe en la base de datos' };

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
