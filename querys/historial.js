const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getHistorialPorId = async (id) => {
  const historial = await prisma.HISTORIAL.findMany({
    where: {
      ID_USUARIO: Number(id),
    },
  });

  return historial;
};

const postHistorial = async (historial, id) => {
  const { id_lectura } = historial;

  // Validar si el usuario existe en la base de datos
  const usuarioExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(id),
    },
  });

  if (!usuarioExiste)
    return { msg: 'El usuario no existe en la base de datos' };

  // Validar si la lectura existe en la base de datos
  const lecturaExiste = await prisma.LECTURAS.findFirst({
    where: {
      ID_LECTURA: Number(id_lectura),
    },
  });

  if (!lecturaExiste)
    return { msg: 'La lectura no existe en la base de datos' };

  const historialDB = await prisma.HISTORIAL.create({
    data: {
      ID_USUARIO: Number(usuarioExiste.ID_USUARIO),
      ID_LECTURA: Number(lecturaExiste.ID_LECTURA),
      AVANCE: Number(historial.avance),
      TIEMPO_FINAL: Number(historial.tiempo_final),
      FECHA_INICIO: new Date(historial.fecha_inicio),
      FECHA_FINAL: new Date(historial.fecha_final),
    },
  });

  return historialDB;
};

module.exports = {
  getHistorialPorId,
  postHistorial,
};
