const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getSalas = async () => {
  return await prisma.SALAS.findMany({
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
};

const getSala = async (id) => {
  return await prisma.SALAS.findFirst({
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
};

const postSalas = async (id, sala) => {
  const hash = generadorHash();

  // Validar si no existe el hash generado
  const hashExiste = await prisma.SALAS.findFirst({
    where: { HASH: hash },
  });

  if (hashExiste) postSalas(id, sala);

  return await prisma.SALAS.create({
    data: {
      DESCRIPCION: sala.descripcion,
      FECHA_CREACION: new Date(),
      HASH: hash,
      ID_RESPONSABLE: Number(id),
    },
  });
};

const postSalasActualizar = async (id_profesor, sala) => {
  const profesorSala = await prisma.SALAS.findFirst({
    where: {
      ID_SALA: Number(sala.id_sala),
      ID_RESPONSABLE: Number(id_profesor),
    },
  });

  if (!profesorSala)
    return { msg: 'El Profesor no tiene permisos en esta sala' };

  return await prisma.SALAS.update({
    data: {
      DESCRIPCION: sala.descripcion,
    },
  });
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
  postSalasActualizar,
};
