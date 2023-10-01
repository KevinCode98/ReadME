const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getPregunta = async (id) => {
  return await prisma.PREGUNTAS.findFirst({
    where: {
      ID_PREGUNTA: Number(id),
    },
    include: {
      QUESTIONARIOS: {
        select: {
          DESCRIPCION: true,
          NIVEL: true,
        },
      },
    },
  });
};

const getPreguntaConOpciones = async (id) => {
  return await prisma.PREGUNTAS.findMany({
    select: {
      ID_PREGUNTA: true,
      DESCRIPCION: true,
      OPCIONES: {
        select: {
          ID_OPCION: true,
          DESCRIPCION: true,
        },
      },
    },
    where: {
      ID_PREGUNTA: Number(id),
    },
  });
};

const postPregunta = async (descripcion, id_questionario) => {
  return await prisma.PREGUNTAS.create({
    data: {
      DESCRIPCION: descripcion,
      ID_QUESTIONARIO: Number(id_questionario),
    },
  });
};

module.exports = {
  getPregunta,
  postPregunta,
  getPreguntaConOpciones,
};
