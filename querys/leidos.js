const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getLeido = async (id) => {
  return await prisma.LEIDOS.findFirst({
    where: { ID_LEIDO: Number(id) },
  });
};

const postLeido = async (leido, id_usuario) => {
  const progreso = await prisma.PROGRESOS.findFirst({
    where: {
      ID_USUARIO: Number(id_usuario),
      ID_LECTURA: Number(leido.id_lectura),
    },
  });

  const tiempo = 0;

  return await prisma.LEIDOS.create({
    data: {
      ID_USUARIO: Number(id_usuario),
      ID_LECTURA: Number(leido.id_lectura),
      TIEMPO_FINAL: tiempo,
      FECHA_INICIO: progreso ? progreso.FECHA : new Date(),
      FECHA_FINAL: new Date(),
    },
  });
};

module.exports = {
  getLeido,
  postLeido,
};
