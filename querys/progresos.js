const moment = require('moment');
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

const getProgresosPorDia = async (id_alumno, fecha = new Date()) => {
  const dia = getInicioDia(new Date(fecha));
  const finDia = getFinDia(new Date(fecha));

  const progresosDia = await prisma.PROGRESOS.findMany({
    where: {
      FECHA: {
        lte: finDia,
        gte: dia,
      },
      ID_USUARIO: Number(id_alumno),
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

const getProgresoPorSemana = async (id_alumno, fecha = new Date()) => {
  const diaSemana = new Date(moment(fecha).subtract(6, 'day'));
  const mapDias = new Map();

  for await (let x of [0, 1, 2, 3, 4, 5, 6]) {
    const nuevaFecha = moment(diaSemana).add(x, 'day');
    const progresos = await prisma.PROGRESOS.findMany({
      where: {
        FECHA: {
          lte: getFinDia(nuevaFecha),
          gte: getInicioDia(nuevaFecha),
        },
        ID_USUARIO: Number(id_alumno),
      },
      orderBy: {
        FECHA: 'asc',
      },
    });

    let totalTiempo = 0;
    progresos.forEach((progreso) => {
      totalTiempo += progreso.TIEMPO;
    });

    mapDias.set(getFechaString(nuevaFecha), totalTiempo);
  }

  return [...mapDias.entries()];
};

const getProgresoPorMes = async (id_alumno, fecha = new Date()) => {
  const diaMes = new Date(moment(fecha).subtract(1, 'month'));
  const mapMes = new Map();
  let contador = 0;

  for (let semana = 0; semana < 4; semana++) {
    const keySemana = `sem-${semana + 1}`;
    let totalTiempo = 0;
    for (let dia = 0; dia < 7; dia++) {
      const nuevaFecha = moment(diaMes).add(contador, 'day');
      const progreso = await prisma.PROGRESOS.findMany({
        where: {
          FECHA: {
            lte: getFinDia(nuevaFecha),
            gte: getInicioDia(nuevaFecha),
          },
          ID_USUARIO: Number(id_alumno),
        },
        orderBy: {
          FECHA: 'asc',
        },
      });

      progreso.forEach((progreso) => {
        totalTiempo += progreso.TIEMPO;
      });
      contador++;
    }
    mapMes.set(keySemana, totalTiempo);
  }

  return [...mapMes.entries()];
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

const getInicioDia = (fecha) => {
  const dia = fecha.toISOString().split('T')[0];
  const fechaInicio = new Date(dia);

  return fechaInicio;
};

const getFinDia = (fecha) => {
  const dia = fecha.toISOString().split('T')[0];
  const fechalocal = new Date(`${dia}T23:59:59`).toLocaleString();
  const arrayFecha = fechalocal.split(', ');
  const diasFecha = arrayFecha[0].split('/');
  for (const pos in diasFecha) {
    if (Number(diasFecha[pos]) < 10) {
      diasFecha[pos] = '0' + diasFecha[pos];
    }
  }

  const arrayHora = arrayFecha[1].split(' ');
  const fechaFin = new Date(
    `${diasFecha[2]}-${diasFecha[0]}-${diasFecha[1]}T${arrayHora[0]}`
  );

  return fechaFin;
};

const getFechaString = (fecha) => {
  fecha = fecha.toString();
  const fechaSplit = fecha.split(' ');
  let nuevaFecha = fechaSplit[0];

  return nuevaFecha;
};

module.exports = {
  deleteTodosLosProgresos,
  getProgresoPorId,
  getProgresoPorLectura,
  getProgresoPorMes,
  getProgresoPorSemana,
  getProgresosPorDia,
  getTiempoTotalPorLibro,
  postProgreso,
};
