const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const opcionesDB = require('../querys/opciones');

const getRespuesta = async (id) => {
  return await prisma.RESPUESTAS.findFirst({
    where: { ID_PREGUNTA: Number(id) },
  });
};

const getRespuestasDeQuestionario = async (questionario) => {
  return await prisma.QUESTIONARIOS.findMany({
    select: {
      PREGUNTAS: {
        select: {
          ID_PREGUNTA: true,
          DESCRIPCION: true,
          OPCIONES: {
            select: {
              ID_OPCION: true,
              CORRECTA: true,
              DESCRIPCION: true,
            },
          },
          RESPUESTAS: {
            select: {
              ID_OPCION: true,
              PUNTOS: true,
            },
            where: {
              ID_USUARIO: Number(questionario.id_alumno),
            },
          },
        },
      },
    },
    where: {
      ID_QUESTIONARIO: Number(questionario.id_questionario),
    },
  });
};

const postRespuestas = async (respuesta, id_alumno) => {
  const opcion = await opcionesDB.getOpcion(respuesta.id_opcion);

  let puntos = 0;
  if (opcion.CORRECTA === true) puntos = 100 * Number(respuesta.tiempo);

  return await prisma.RESPUESTAS.create({
    data: {
      ID_PREGUNTA: Number(respuesta.id_pregunta),
      ID_OPCION: Number(respuesta.id_opcion),
      ID_USUARIO: Number(id_alumno),
      PUNTOS: Number(puntos),
    },
  });
};

module.exports = {
  getRespuesta,
  postRespuestas,
  getRespuestasDeQuestionario,
};
