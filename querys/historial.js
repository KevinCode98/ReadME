const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getHistorialPorId = async (id) => {
  const historial = await prisma.HISTORIAL.findMany({
    where: {
      ID_USUARIO: Number(id),
    },
    select: {
      ID_HISTORIAL: true,
      AVANCE: true,
      FECHA: true,
      ID_LECTURA: true,
      LECTURAS: {
        select: {
          TITULO: true,
          PUNTUACION: true,
          AUTORES: {
            select: {
              NOMBRE: true,
              APELLIDOS: true,
            },
          },
        },
      },
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

const postHistorial = async (historial, id, tiempo) => {
  const existeHistorial = await prisma.HISTORIAL.findFirst({
    where: {
      ID_USUARIO: Number(id),
      ID_LECTURA: Number(historial.id_lectura),
    },
  });

  if (existeHistorial) {
    return await prisma.HISTORIAL.update({
      data: {
        AVANCE: parseInt(historial.avance),
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
        AVANCE: parseInt(historial.avance),
        FECHA: new Date(tiempo),
      },
    });
  }
};

const deleteHistorial = async (id_historial) => {
  return await prisma.HISTORIAL.delete({
    where: {
      ID_HISTORIAL: Number(id_historial),
    },
  });
};

module.exports = {
  getHistorialPorId,
  getHistorialArregloUsuariosLecura,
  postHistorial,
  deleteHistorial,
};
