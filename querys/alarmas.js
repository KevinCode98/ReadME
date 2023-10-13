const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAlarma = async (id_alarma) => {
  return await prisma.ALARMAS.findFirst({
    where: { ID_ALARMA: Number(id_alarma) },
  });
};

const getAlarmasPorID = async (id_usuario) => {
  return await prisma.ALARMAS.findMany({
    where: { ID_USUARIO: Number(id_usuario) },
  });
};

const postAlarma = async (alarma, id_usuario) => {
  return await prisma.ALARMAS.create({
    data: {
      DESCRIPCION: alarma.descripcion,
      HORA: alarma.hora,
      ID_USUARIO: Number(id_usuario),
    },
  });
};

const deleteAlarma = async (id_alarma, id_usuario) => {
  const alarmaExiste = await prisma.ALARMAS.findFirst({
    where: {
      ID_USUARIO: Number(id_usuario),
      ID_ALARMA: Number(id_alarma),
    },
  });

  if (!alarmaExiste)
    return { msg: 'El usuario no tiene permisos para eliminar' };

  return await prisma.ALARMAS.delete({
    where: { ID_ALARMA: Number(id_alarma) },
  });
};

module.exports = {
  getAlarma,
  getAlarmasPorID,
  postAlarma,
  deleteAlarma,
};
