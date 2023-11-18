const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAsignacion = async (id) => {
  return await prisma.ASIGNACIONES.findFirst({
    select: {
      ID_SALA: true,
      TITULO: true,
      INDICACION: true,
      FECHA_CREACION: true,
      LECTURAS: {
        select: {
          ID_LECTURA: true,
          TITULO: true,
        },
      },
      QUESTIONARIOS: {
        select: {
          ID_QUESTIONARIO: true,
          DESCRIPCION: true,
        },
      },
    },
    where: {
      ID_ASIGNACION: Number(id),
    },
  });
};

const postAsignacion = async (asignacion, id_profesor) => {
  const profesorSala = await prisma.SALAS.findFirst({
    where: {
      ID_SALA: Number(asignacion.id_sala),
      ID_RESPONSABLE: Number(id_profesor),
    },
  });

  if (!profesorSala)
    return { msg: 'El Profesor no tiene permisos en esta sala' };

  return await prisma.ASIGNACIONES.create({
    data: {
      TITULO: asignacion.titulo,
      INDICACION: asignacion.indicaciones,
      FECHA_CREACION: new Date(),
      ID_SALA: Number(asignacion.id_sala),
      ID_LECTURA: Number(asignacion.id_lectura) || null,
    },
    select: {
      ID_ASIGNACION: true,
      TITULO: true,
      SALAS: {
        select: {
          ID_SALA: true,
          DESCRIPCION: true,
        },
      },
    },
  });
};

const getAsignacionesPorSala = async (sala) => {
  // validar si la sala existe
  const salaExiste = await prisma.SALAS.findFirst({
    where: {
      ID_SALA: Number(sala),
    },
    select: {
      ID_RESPONSABLE: true,
    },
  });

  if (!salaExiste) return { msg: 'La Sala no existe en la base de datos' };

  const asignaciones = await prisma.ASIGNACIONES.findMany({
    select: {
      ID_ASIGNACION: true,
      ID_SALA: true,
      ID_LECTURA: true,
      TITULO: true,
      INDICACION: true,
      FECHA_CREACION: true,
    },
    where: {
      ID_SALA: Number(sala),
    },
  });

  return { asignaciones, responsable: salaExiste.ID_RESPONSABLE };
};

module.exports = {
  getAsignacion,
  postAsignacion,
  getAsignacionesPorSala,
};
