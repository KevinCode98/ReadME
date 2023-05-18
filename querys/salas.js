const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getSalas = async () => {
  const salas = await prisma.SALAS.findMany({
    select: {
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
  const salas = await prisma.SALAS.findUnique({
    select: {
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

  return salas;
};

const postSalas = async (sala) => {
  // Validar que el Usuario exista en la base de datos
  const idResponsable = sala.id_responsable;

  const responsableExiste = await prisma.USUARIOS.findUnique({
    where: {
      ID_USUARIO: Number(idResponsable),
    },
    select: {
      ID_USUARIO: true,
    },
  });

  if (!responsableExiste)
    return { msg: 'El Usario no existe en la base de datos' };

  const hash = generadorHash();

  // Validar si no existe el hash generado
  const hashExiste = await prisma.SALAS.findFirst({
    where: { HASH: hash },
  });

  if (hashExiste) postSalas(sala);

  const salaDB = await prisma.SALAS.create({
    data: {
      DESCRIPCION: sala.descripcion,
      FECHA_CREACION: new Date(),
      HASH: hash,
      USUARIOS: {
        connect: {
          ID_USUARIO: sala.id_responsable,
        },
      },
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
