const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getPregunta = async (id) => {
  const pregunta = await prisma.PREGUNTAS.findFirst({
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

  return pregunta;
};

const postPregunta = async (pregunta) => {
  const idQuestonario = Number(pregunta.id_questionario);

  // Verificar si el Questionario existe en la base de datos
  const questionarioExiste = await prisma.QUESTIONARIOS.findFirst({
    where: {
      ID_QUESTIONARIO: idQuestonario,
    },
  });

  if (!questionarioExiste)
    return { msq: 'El questionario no existe en la base de datos' };

  const preguntaDB = await prisma.PREGUNTAS.create({
    data: {
      DESCRIPCION: pregunta.descripcion,
      CERRADA: Boolean(pregunta.cerrada),
      QUESTIONARIOS: {
        connect: {
          ID_QUESTIONARIO: Number(pregunta.id_questionario),
        },
      },
    },
  });

  return preguntaDB;
};

module.exports = {
  getPregunta,
  postPregunta,
};
