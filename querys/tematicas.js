const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTematicas = async () => {
  return await prisma.TEMATICAS.findMany();
};

const getArrayTematicas = async () => {
  const tematicas = await getTematicas();
  let arrayTematicas = [];

  tematicas.forEach((tematica) => {
    arrayTematicas.push(tematica.NOMBRE);
  });

  return arrayTematicas;
};

const getTematica = async (id) => {
  return await prisma.TEMATICAS.findFirst({
    where: {
      ID_TEMATICA: Number(id),
    },
  });
};

module.exports = {
  getTematica,
  getTematicas,
  getArrayTematicas,
};
