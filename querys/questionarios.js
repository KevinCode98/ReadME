const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const preguntaDB = require('../querys/preguntas');
const opcionesDB = require('../querys/opciones');

const getQuestionario = async (id) => {
  return await prisma.QUESTIONARIOS.findFirst({
    where: { ID_QUESTIONARIO: Number(id) },
  });
};

const getQuestionarioConPreguntas = async (id) => {
  return await prisma.QUESTIONARIOS.findMany({
    select: {
      PREGUNTAS: {
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
      },
    },
    where: {
      ID_QUESTIONARIO: Number(id),
    },
  });
};

const postQuestionario = async (questionario) => {
  const questionarioDB = await prisma.QUESTIONARIOS.create({
    data: {
      DESCRIPCION: questionario.descripcion,
      NIVEL: Number(questionario.nivel),
      ID_ASIGNACION: Number(questionario.id_asignacion),
    },
  });

  const preguntas = questionario.preguntas;
  preguntas.forEach(async (pregunta) => {
    const preguntaResponse = await preguntaDB.postPregunta(
      pregunta.descripcion,
      questionarioDB.ID_QUESTIONARIO
    );

    const opciones = pregunta.opciones;
    opciones.forEach(async (opcion) => {
      await opcionesDB.postOpcion(opcion, preguntaResponse.ID_PREGUNTA);
    });
  });

  return { msg: 'Holi' };
};

module.exports = {
  getQuestionario,
  getQuestionarioConPreguntas,
  postQuestionario,
};
