const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTematicas = async () => {
  return await prisma.TEMATICAS.findMany();
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
};
