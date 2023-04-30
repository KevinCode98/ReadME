const { PrismaClient } = require('@prisma/client');

const pristma = new PrismaClient();

const getLecturas = async () => {
  const lecturas = await pristma.LECTURAS.findMany({
    select: {
      TITULO: true,
      GENERO: true,
      CORRIENTE_LITERARIA: true,
      PUNTUACION: true,
    },
  });

  return lecturas;
};

const getLectura = async (id) => {
  const lecturas = await pristma.LECTURAS.findMany({
    select: {
      TITULO: true,
      GENERO: true,
      CORRIENTE_LITERARIA: true,
      PUNTUACION: true,
    },
    where: {
      ID_LECTURA: id,
    },
  });

  return lecturas;
};

module.exports = {
  getLecturas,
  getLectura,
};
