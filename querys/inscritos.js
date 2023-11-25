const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getInscritos = async (id) => {
  return await prisma.INSCRITOS.findMany({
    select: {
      ID_SALA: true,
      ID_USUARIO: true,
      ACEPTADO: true,
      USUARIOS: {
        select: {
          NOMBRE: true,
          APELLIDOS: true,
        },
      },
    },
    where: {
      ID_SALA: Number(id),
    },
  });
};

const getInscritosAceptados = async (id) => {
  return await prisma.INSCRITOS.findMany({
    select: {
      ID_SALA: true,
      ID_USUARIO: true,
      ACEPTADO: true,
    },
    where: {
      ID_SALA: Number(id),
      ACEPTADO: 'ACEPTADO',
    },
  });
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

const postEliminarInscritosProfesor = async (inscrito, id_profesor) => {
  // Validar que el usuario que se elimine sea Alumno
  const alumnoExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(inscrito.id_alumno),
      TIPO_USUARIO: 'Alumno',
    },
  });

  if (!alumnoExiste) return { msg: 'El Alumno no existe en la base de datos' };

  // Validar que el profesor sea propietario de la sala
  const existeSala = await prisma.SALAS.findFirst({
    where: {
      ID_SALA: Number(inscrito.id_sala),
      ID_RESPONSABLE: Number(id_profesor),
    },
  });

  if (!existeSala) return { msg: 'El profesor no tiene persimos en la sala' };

  // Encontrar el valor del inscrito
  const inscritoDB = await prisma.INSCRITOS.findFirst({
    where: {
      ID_USUARIO: Number(inscrito.id_alumno),
      ID_SALA: Number(inscrito.id_sala),
    },
  });

  // Eliminar el inscrito
  return await prisma.INSCRITOS.delete({
    where: { ID_INSCRITOS: Number(inscritoDB.ID_INSCRITOS) },
  });
};

const postInscritosHash = async (hash, id_alumno) => {
  const salaExiste = await prisma.SALAS.findFirst({
    where: {
      HASH: hash,
    },
  });

  if (!salaExiste)
    return { msg: 'El hash no se encuentra en la base de datos' };

  const alumnoExiste = await prisma.INSCRITOS.findFirst({
    where: {
      ID_USUARIO: Number(id_alumno),
      ID_SALA: Number(salaExiste.ID_SALA),
    },
  });

  if (alumnoExiste) return { msg: 'El alumno ya se encuentra en la sala' };

  return await prisma.INSCRITOS.create({
    data: {
      ID_SALA: Number(salaExiste.ID_SALA),
      ID_USUARIO: Number(id_alumno),
      ACEPTADO: 'ACEPTADO',
    },
  });
};

module.exports = {
  getInscritos,
  getInscritosAceptados,
  postInscritos,
  postInscritosHash,
  postEliminarInscritosProfesor,
};
