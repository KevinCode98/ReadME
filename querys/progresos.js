const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProgresoPorId = async (id) => {
  return await prisma.PROGRESOS.findMany({
    where: {
      ID_USUARIO: Number(id),
    },
  });
};

const getProgresoPorLectura = async (id, lectura) => {
  return await prisma.PROGRESOS.findMany({
    where: {
      ID_USUARIO: Number(id),
      ID_LECTURA: Number(lectura),
    },
  });
};

const getProgresosPorDia = async (id, date = new Date()) => {
  const dia = new Date(date).toISOString().split('T')[0];
  const fechalocal = new Date(`${date}T17:59:59`).toLocaleString();
  const arrayFecha = fechalocal.split(', ');
  const diasFecha = arrayFecha[0].split('/');
  const finDia = new Date(
    `${diasFecha[2]}-${diasFecha[1]}-${diasFecha[0]}T${arrayFecha[1]}`
  );

  const progresosDia = await prisma.PROGRESOS.findMany({
    where: {
      FECHA: {
        lte: new Date(finDia),
        gte: new Date(dia),
      },
      ID_USUARIO: Number(id),
    },
    orderBy: {
      FECHA: 'asc',
    },
  });

  const mapHoras = new Map();

  for (let x = 0; x < 24; x++) mapHoras.set(x, 0);

  progresosDia.forEach((progreso) => {
    const hora = progreso.FECHA.getHours();
    const auxTiempo = mapHoras.get(hora);
    mapHoras.set(hora, auxTiempo + progreso.TIEMPO);
  });

  return [...mapHoras.entries()];
};

const getTiempoTotalPorLibro = async (id_lectura, id_usuario, fechaInicio) => {
  let tiempoTotal = 0;
  const tiempos = await prisma.PROGRESOS.findMany({
    where: {
      ID_USUARIO: Number(id_usuario),
      ID_LECTURA: Number(id_lectura),
      FECHA: {
        lte: new Date(),
        gte: new Date(fechaInicio),
      },
    },
    select: {
      TIEMPO: true,
    },
  });

  tiempos.forEach((tiempoProgreso) => {
    tiempoTotal += tiempoProgreso.TIEMPO;
  });

  return tiempoTotal;
};

const postProgreso = async (progreso, id) => {
  return await prisma.PROGRESOS.create({
    data: {
      ID_USUARIO: Number(id),
      ID_LECTURA: Number(progreso.id_lectura),
      TIEMPO: Number(progreso.tiempo),
      FECHA: new Date(),
    },
  });
};

const deleteTodosLosProgresos = async (id_alumno, id_lectura) => {
  const progresos = await prisma.PROGRESOS.findMany({
    where: {
      ID_USUARIO: Number(id_alumno),
      ID_LECTURA: Number(id_lectura),
    },
  });

  progresos.forEach(async (progreso) => {
    await prisma.PROGRESOS.delete({
      where: {
        ID_PROGRESOS: Number(progreso.ID_PROGRESOS),
      },
    });
  });
};

module.exports = {
  getProgresoPorId,
  getProgresoPorLectura,
  getProgresosPorDia,
  getTiempoTotalPorLibro,
  postProgreso,
  deleteTodosLosProgresos,
};
