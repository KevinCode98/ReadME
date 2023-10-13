const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const opcionesDB = require('../querys/opciones');
const alumnosDB = require('../querys/alumnos');
const inscritosDB = require('../querys/inscritos');
const questionariosDB = require('../querys/questionarios');
const asignacionesDB = require('../querys/asignaciones');

const getRespuesta = async (id) => {
  return await prisma.RESPUESTAS.findFirst({
    where: { ID_PREGUNTA: Number(id) },
  });
};

const getRespuestasDeQuestionario = async (questionario) => {
  return await prisma.QUESTIONARIOS.findFirst({
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

const getRespuestasPuntos = async (questionario) => {
  let puntos = 0;
  const questionarioDB = await getRespuestasDeQuestionario(questionario);
  const alumnoExiste = await alumnosDB.getAlumno(questionario.id_alumno);
  const preguntas = questionarioDB.PREGUNTAS;

  preguntas.forEach((pregunta) => {
    if (pregunta.RESPUESTAS.length !== 0)
      puntos += Number(pregunta.RESPUESTAS[0].PUNTOS);
  });

  alumnoExiste.puntos = puntos;
  return alumnoExiste;
};

const getRespuestasPuntosAlumnosQuestionario = async (id_questionario) => {
  let resultadosPuntos;
  const alumnosPuntos = [];
  const questionario = await questionariosDB.getQuestionario(id_questionario);
  const asignacion = await asignacionesDB.getAsignacion(
    questionario.ID_ASIGNACION
  );
  const alumnos = await inscritosDB.getInscritosAceptados(asignacion.ID_SALA);

  await alumnos.forEach(async (alumno) => {
    const questionarioDatos = {
      id_questionario: Number(id_questionario),
      id_alumno: Number(alumno.ID_USUARIO),
    };
    alumnosPuntos.push(getRespuestasPuntos(questionarioDatos));
  });

  await Promise.all(alumnosPuntos)
    .then((valores) => {
      resultadosPuntos = valores;
    })
    .catch({ msg: 'Error' });

  return resultadosPuntos;
};

module.exports = {
  getRespuesta,
  postRespuestas,
  getRespuestasDeQuestionario,
  getRespuestasPuntosAlumnosQuestionario,
  getRespuestasPuntos,
};
