const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getSalas = async () => {
  const salas = await prisma.SALAS.findMany({
    select: {
      ID_SALA: true,
      DESCRIPCION: true,
      FECHA_CREACION: true,
      HASH: true,
      USUARIOS: {
        select: {
          NOMBRE: true,
          APELLIDOS: true,
          EMAIL: true,
        },
      },
    },
  });

  return salas;
};

const getSala = async (id) => {
  const sala = await prisma.SALAS.findFirst({
    select: {
      ID_SALA: true,
      DESCRIPCION: true,
      FECHA_CREACION: true,
      HASH: true,
      USUARIOS: {
        select: {
          NOMBRE: true,
          APELLIDOS: true,
          EMAIL: true,
        },
      },
    },
    where: {
      ID_SALA: Number(id),
    },
  });

  return sala;
};

const getAsignacionesPorSala = async (sala) => {};

const postSalas = async (id, sala) => {
  const hash = generadorHash();

  // Validar si no existe el hash generado
  const hashExiste = await prisma.SALAS.findFirst({
    where: { HASH: hash },
  });

  if (hashExiste) postSalas(id, sala);

  const salaDB = await prisma.SALAS.create({
    data: {
      DESCRIPCION: sala.descripcion,
      FECHA_CREACION: new Date(),
      HASH: hash,
      ID_RESPONSABLE: Number(id),
    },
  });

  return salaDB;
};

const generadorHash = () => {
  const banco =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let hash = '';

  for (let i = 0; i < 11; i++) {
    hash += banco.charAt(Math.floor(Math.random() * banco.length));
    if (i % 4 == 0 && i != 0) hash += '-';
  }

  return hash;
};

module.exports = {
  getSala,
  getSalas,
  postSalas,
};
