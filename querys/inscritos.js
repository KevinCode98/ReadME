const { PrismaClient } = require('@prisma/client');
const { isUint8ClampedArray } = require('util/support/types');

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
  // Validar que el usuario que se incribira solamente puede ser Alumno
  const usuarioExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(inscrito.id_usuario),
      TIPO_USUARIO: 'Alumno',
    },
  });

  if (!usuarioExiste) return { msg: 'El Alumno no existe en la base de datos' };

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
    },
  });

  return inscritoDB;
};

module.exports = {
  getInscritos,
  postInscritos,
};
