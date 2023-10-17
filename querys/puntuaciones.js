const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPuntuacion = async (id_puntuacion) => {
  return await prisma.PUNTUACIONES.findFirst({
    where: { ID_PUNTUACION: Number(id_puntuacion) },
  });
};

const getCantidadPuntuaciones = async (id_lectura) => {
  return (
    await prisma.PUNTUACIONES.findMany({
      where: { ID_LECTURA: Number(id_lectura) },
    })
  ).length;
};

const getSumaPuntuaciones = async (id_lectura) => {
  const puntuaciones = await prisma.PUNTUACIONES.findMany({
    where: { ID_LECTURA: Number(id_lectura) },
  });

  let total = 0;
  puntuaciones.forEach((puntuacion) => {
    total += Number(puntuacion.PUNTUACION);
  });

  return total;
};

const postPuntuacion = async (puntuacion, id_usuario) => {
  const existePuntuacion = await prisma.PUNTUACIONES.findFirst({
    where: {
      ID_USUARIO: Number(id_usuario),
      ID_LECTURA: Number(puntuacion.id_lectura),
    },
  });

  if (existePuntuacion !== null) {
    return await prisma.PUNTUACIONES.update({
      data: {
        PUNTUACION: Number(puntuacion.puntuacion),
      },
      where: {
        ID_PUNTUACION: Number(existePuntuacion.ID_PUNTUACION),
      },
    });
  } else {
    return await prisma.PUNTUACIONES.create({
      data: {
        ID_USUARIO: Number(id_usuario),
        ID_LECTURA: Number(puntuacion.id_lectura),
        PUNTUACION: Number(puntuacion.puntuacion),
      },
    });
  }
};

module.exports = {
  getPuntuacion,
  getCantidadPuntuaciones,
  getSumaPuntuaciones,
  postPuntuacion,
};
