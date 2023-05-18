const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getRespuestas = async (id) => {
  const respuestas = await prisma.RESPUESTAS.findMany({
    where: {
      ID_PREGUNTA: id,
    },
    select: {
      ID_RESPUESTA: true,
      ID_USUARIO: true,
      TEXTO_RESPUESTA: true,
    },
  });
};

const postRespuestas = async (respuesta) => {
  const idPregunta = respuesta.id_pregunta;
  console.log(respuesta);

  // Verificar que la respuesta exista en la base de datos
  const preguntaExiste = await prisma.PREGUNTAS.findUnique({
    where: {
      ID_PREGUNTA: idPregunta,
    },
  });

  console.log(preguntaExiste);
  // TODO: REALIZAR EL MANEJO DE PREGUNTAS CERRADAS
};

module.exports = {
  getRespuestas,
  postRespuestas,
};
