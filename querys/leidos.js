const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const progresosDB = require('./progresos');

const getLeido = async (id) => {
  return await prisma.LEIDOS.findFirst({
    where: { ID_LEIDO: Number(id) },
  });
};

const getLeidosPorUsuario = async (id) => {
  return await prisma.LEIDOS.findMany({
    where: { ID_USUARIO: Number(id) },
    select: {
      ID_LEIDO: true,
      LECTURAS: {
        select: {
          ID_LECTURA: true,
          AUTORES: {
            select: {
              ID_AUTOR: true,
              NOMBRE: true,
              APELLIDOS: true,
            },
          },
          TEMATICAS: {
            select: {
              ID_TEMATICA: true,
              NOMBRE: true,
            },
          },
          CORRIENTES: {
            select: {
              ID_CORRIENTE: true,
              NOMBRE: true,
            },
          },
        },
      },
    },
  });
};

const getLeidoUsuariosPorLectura = async (id_lectura) => {
  const leidos = await prisma.LEIDOS.findMany({
    where: {
      ID_LECTURA: Number(id_lectura),
    },
    select: {
      ID_USUARIO: true,
    },
  });

  let usuarios = [];
  leidos.forEach((usuarioLeidos) => {
    usuarios.push(usuarioLeidos.ID_USUARIO);
  });

  return usuarios;
};

const postLeido = async (id_lectura, id_alumno, id_historial, tiempo) => {
  const historial = await prisma.HISTORIAL.findFirst({
    where: {
      ID_HISTORIAL: Number(id_historial),
    },
  });

  if (!historial) return { msg: 'No existe ningun historial' };
  const tiempoTotal = await progresosDB.getTiempoTotalPorLibro(
    id_lectura,
    id_alumno,
    historial.FECHA
  );

  return await prisma.LEIDOS.create({
    data: {
      ID_USUARIO: Number(id_alumno),
      ID_LECTURA: Number(id_lectura),
      TIEMPO_FINAL: Number(tiempoTotal),
      FECHA_INICIO: historial.FECHA,
      FECHA_FINAL: new Date(tiempo),
    },
  });
};

module.exports = {
  getLeido,
  getLeidosPorUsuario,
  getLeidoUsuariosPorLectura,
  postLeido,
};
