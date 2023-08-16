const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCorrientes = async () => {
  return await prisma.CORRIENTES.findMany();
};

const getCorriente = async (id) => {
  return await prisma.CORRIENTES.findFirst({
    where: {
      ID_CORRIENTE: Number(id),
    },
  });
};

module.exports = {
  getCorriente,
  getCorrientes,
};
