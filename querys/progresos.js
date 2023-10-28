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

module.exports = {
  getProgresoPorId,
  getProgresoPorLectura,
  getProgresosPorDia,
  postProgreso,
};
