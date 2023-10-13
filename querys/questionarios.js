const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const preguntaDB = require('../querys/preguntas');
const opcionesDB = require('../querys/opciones');

const getQuestionario = async (id) => {
  return await prisma.QUESTIONARIOS.findFirst({
    where: { ID_QUESTIONARIO: Number(id) },
  });
};

const getQuestionarioContestado = async (id_questionario, id_alumno) => {
  let preguntasContestadas = [];
  const questionario = { id_questionario, id_alumno };

  const respuestas = await prisma.QUESTIONARIOS.findFirst({
    select: {
      PREGUNTAS: {
        select: {
          ID_PREGUNTA: true,
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

  respuestasAlumno = respuestas.PREGUNTAS;
  respuestasAlumno.forEach((respuesta) => {
    if (respuesta.RESPUESTAS[0])
      preguntasContestadas.push(respuesta.ID_PREGUNTA);
  });
  return preguntasContestadas;
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
  // Existe algun cuestionario con la asignacion
  const existeQuestionario = await prisma.QUESTIONARIOS.findFirst({
    where: { ID_ASIGNACION: Number(questionario.id_asignacion) },
  });

  if (existeQuestionario)
    return { msg: 'La asignacion ya cuenta con un questionario' };

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

  return await getQuestionarioConPreguntas(questionarioDB.ID_QUESTIONARIO);
};

module.exports = {
  getQuestionario,
  getQuestionarioConPreguntas,
  getQuestionarioContestado,
  postQuestionario,
};
