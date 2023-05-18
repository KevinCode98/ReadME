const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getInscritos = async (id) => {
  const inscritos = await prisma.INSCRITOS.findMany({
    select: {
      ID_SALA: true,
      ID_USUARIO: true,
      ACEPTADO: true,
    },
    where: {
      ID_SALA: Number(id),
    },
  });

  return inscritos;
};

const postInscritos = async (inscrito) => {
  // Validar que el Usuario exista en la base de datos
  const idUsuario = inscrito.id_usuario;

  const usuarioExiste = await prisma.USUARIOS.findUnique({
    where: {
      ID_USUARIO: Number(idUsuario),
    },
  });

  if (!usuarioExiste) return { msg: 'El Usario no existe en la base de datos' };

  // Validar que la Sala exista en la base de datos
  const idSala = inscrito.id_sala;

  const salaExiste = await prisma.SALAS.findUnique({
    where: {
      ID_SALA: Number(idSala),
    },
  });

  if (!salaExiste) return { msg: 'La Sala no existe en la base de datos' };

  const inscritoDB = await prisma.INSCRITOS.create({
    data: {
      SALAS: {
        connect: {
          ID_SALA: Number(inscrito.id_sala),
        },
      },
      USUARIOS: {
        connect: {
          ID_USUARIO: Number(inscrito.id_usuario),
        },
      },
      ACEPTADO: false,
    },
  });

  return inscritoDB;
};

module.exports = {
  getInscritos,
  postInscritos,
};
