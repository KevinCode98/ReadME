const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getQuestionario = async (id) => {
  const questionario = await prisma.QUESTIONARIOS.findFirst({
    include: {
      LECTURAS: {
        select: {
          TITULO: true,
          GENERO: true,
          CORRIENTE_LITERARIA: true,
        },
      },
    },
    where: {
      ID_QUESTIONARIO: Number(id),
    },
  });

  return questionario;
};

const postQuestionario = async (questionario) => {
  const questionariosDB = await prisma.QUESTIONARIOS.create({
    data: {
      DESCRIPCION: questionario.descripcion,
      NIVEL: Number(questionario.nivel),
      LECTURAS: {
        connect: {
          ID_LECTURA: Number(questionario.id_lectura),
        },
      },
    },
  });

  return questionariosDB;
};

module.exports = {
  getQuestionario,
  postQuestionario,
};
