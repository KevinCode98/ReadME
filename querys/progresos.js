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

const getProgresoPorAlumno = async (id) => {
  return await prisma.PROGRESOS.findMany({
    where: {
      ID_USUARIO: Number(id),
    },
  });
};

const postProgreso = async (progreso, id) => {
  const { id_lectura, tiempo, fecha } = progreso;

  return await prisma.PROGRESOS.create({
    data: {
      ID_USUARIO: Number(id),
      ID_LECTURA: Number(id_lectura),
      TIEMPO: Number(tiempo),
      FECHA: fecha,
    },
  });
};

module.exports = {
  getProgresoPorId,
  getProgresoPorLectura,
  getProgresoPorAlumno,
  postProgreso,
};
