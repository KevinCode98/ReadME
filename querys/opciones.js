const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getOpcion = async (id) => {
  return await prisma.OPCIONES.findFirst({
    where: { ID_OPCION: Number(id) },
  });
};

const postOpcion = async (opcion, id_pregunta) => {
  return await prisma.OPCIONES.create({
    data: {
      ID_PREGUNTA: Number(id_pregunta),
      CORRECTA: opcion.correcta,
      DESCRIPCION: opcion.descripcion,
    },
  });
};

module.exports = {
  getOpcion,
  postOpcion,
};
