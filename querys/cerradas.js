const { PrismaClient } = require('@prisma/client');
const { cerradasGet } = require('../controllers/cerradas');

const prisma = new PrismaClient();

const getCerradas = async (id) => {
  const cerrada = await prisma.CERRADAS.findMany({
    where: {
      ID_PREGUNTA: Number(id),
    },
    select: {
      ID_CERRADA: true,
      CORRECTA: true,
      DESCRIPCION: true,
    },
  });

  return cerrada;
};

const postCerrada = async (cerrada) => {
  // Validar que el usuario exista en la base de datos
  const idUsuario = cerrada.id_usuario;
  const usuarioExiste = await prisma.USUARIOS.findUnique({
    where: {
      ID_USUARIO: Number(idUsuario),
    },
  });

  if (!usuarioExiste)
    return { msg: 'El usuario no existe en la base de datos' };

  // Validar que el usuario sea PROFESOR
  if (usuarioExiste.TIPO_USUARIO != 'Profesor')
    return { msg: 'El usuario no tiene permisos' };

  // Validar que la pregunta exista en la base de datos
  const idPregunta = cerrada.id_pregunta;
  const preguntaExiste = await prisma.PREGUNTAS.findUnique({
    where: {
      ID_PREGUNTA: Number(idPregunta),
    },
  });

  if (!preguntaExiste)
    return { msg: 'La pregunta no existe en la base de datos' };

  // Validar que la pregunta sea cerrada
  if (!preguntaExiste.CERRADA)
    return { msg: 'La pregunta no es una pregunta cerrada' };

  // Creación de la opción cerrada
  const cerradaDB = await prisma.CERRADAS.create({
    data: {
      CORRECTA: cerrada.correcta,
      DESCRIPCION: cerrada.descripcion,
      PREGUNTAS: {
        connect: {
          ID_PREGUNTA: cerrada.id_pregunta,
        },
      },
      USUARIOS: {
        connect: {
          ID_USUARIO: cerrada.id_usuario,
        },
      },
    },
  });

  return cerradaDB;
};

module.exports = {
  getCerradas,
  postCerrada,
};
