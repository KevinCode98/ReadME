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

const getHistorialArregloUsuariosLecura = async (id) => {
  const lectura = await prisma.HISTORIAL.findMany({
    where: {
      ID_LECTURA: Number(id),
    },
    select: {
      ID_USUARIO: true,
    },
  });

  let usuarios = [];
  lectura.forEach((usuarioLectura) => {
    usuarios.push(usuarioLectura.ID_USUARIO);
  });

  return usuarios;
};

const postHistorial = async (historial, id) => {
  const existeHistorial = await prisma.HISTORIAL.findFirst({
    where: {
      ID_USUARIO: Number(id),
      ID_LECTURA: Number(historial.id_lectura),
    },
  });

  if (existeHistorial) {
    return await prisma.HISTORIAL.update({
      data: {
        AVANCE: Number(historial.avance),
      },
      where: {
        ID_HISTORIAL: Number(existeHistorial.ID_HISTORIAL),
      },
    });
  } else {
    return await prisma.HISTORIAL.create({
      data: {
        ID_USUARIO: Number(id),
        ID_LECTURA: Number(historial.id_lectura),
        AVANCE: Number(historial.avance),
        FECHA: new Date(),
      },
    });
  }
};

module.exports = {
  getHistorialPorId,
  getHistorialArregloUsuariosLecura,
  postHistorial,
};
