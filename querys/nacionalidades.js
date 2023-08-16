const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getNacionalidades = async () => {
  return await prisma.NACIONALIDADES.findMany();
};

const getNacionalidad = async (id) => {
  return await prisma.NACIONALIDADES.findFirst({
    where: {
      ID_NACIONALIDAD: Number(id),
    },
  });
};

module.exports = {
  getNacionalidad,
  getNacionalidades,
};
