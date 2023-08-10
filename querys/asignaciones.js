const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAsignacion = async (id) => {
  const asignacion = await prisma.ASIGNACIONES.findUnique({
    select: {
      ID_SALA: true,
      ID_LECTURA: true,
      TITULO: true,
      INDICACION: true,
      FECHA_CREACION: true,
    },
    where: {
      ID_ASIGNACION: Number(id),
    },
  });

  return asignacion;
};

const postAsignacion = async (asignacion) => {
  // Validar que la Sala exista en la base de datos
  const idSala = asignacion.id_sala;

  const salaExiste = await prisma.SALAS.findUnique({
    where: {
      ID_SALA: Number(idSala),
    },
  });

  if (!salaExiste) return { msg: 'La Sala no existe en la base de datos' };

  // Validar que la Lectura exista en la base de datos
  if (asignacion.id_lectura) {
    const idLectura = asignacion.id_lectura;

    const lecturaExiste = await prisma.lECTURAS.findUnique({
      where: {
        ID_LECTURA: Number(idLectura),
      },
    });

    if (!lecturaExiste)
      return { msg: 'La Lectura no existe en la base de datos' };

    return await prisma.ASIGNACIONES.create({
      data: {
        TITULO: asignacion.titulo,
        INDICACION: asignacion.indicaciones,
        FECHA_CREACION: new Date(),
        SALAS: {
          connect: {
            ID_SALA: Number(asignacion.id_sala),
          },
        },
        LECTURAS: {
          connect: {
            ID_LECTURA: Number(asignacion.id_lectura),
          },
        },
      },
    });
  }

  return await prisma.ASIGNACIONES.create({
    data: {
      TITULO: asignacion.titulo,
      INDICACION: asignacion.INDICACION,
      FECHA_CREACION: new Date(),
      SALAS: {
        connect: {
          ID_SALA: Number(asignacion.id_sala),
        },
      },
    },
  });
};

module.exports = {
  getAsignacion,
  postAsignacion,
};
