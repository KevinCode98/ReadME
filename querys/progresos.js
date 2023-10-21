const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProgresoPorId = async (id) => {
  return await prisma.PROGRESOS.findMany({
    where: {
      ID_USUARIO: Number(id),
    },
  });
};

const getProgresoPorLectura = async (id, lectura) => {
  return await prisma.PROGRESOS.findMany({
    where: {
      ID_USUARIO: Number(id),
      ID_LECTURA: Number(lectura),
    },
  });
};

const postProgreso = async (progreso, id) => {
  return await prisma.PROGRESOS.create({
    data: {
      ID_USUARIO: Number(id),
      ID_LECTURA: Number(progreso.id_lectura),
      TIEMPO: Number(progreso.tiempo),
      FECHA: progreso.fecha,
    },
  });
};

module.exports = {
  getProgresoPorId,
  getProgresoPorLectura,
  postProgreso,
};
