const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getLecturas = async () => {
  let lecturas = await prisma.LECTURAS.findMany({
    include: {
      AUTORES: {
        select: {
          NOMBRE: true,
          APELLIDOS: true,
        },
      },
    },
  });

  return lecturas;
};

const getLectura = async (id) => {
  const lecturas = await prisma.LECTURAS.findMany({
    select: {
      TITULO: true,
      GENERO: true,
      CORRIENTE_LITERARIA: true,
      PUNTUACION: true,
    },
    where: {
      ID_LECTURA: id,
    },
  });

  return lecturas;
};

const postLectura = async (lectura) => {
  const idAutor = lectura.id_autor;

  // Verificar si el autor existe en la base de datos
  const autorExiste = await prisma.AUTORES.findFirst({
    where: {
      ID_AUTOR: idAutor,
    },
  });

  if (!autorExiste) return { msg: 'El autor no existe en la base de datos' };

  const lecturaDB = await prisma.LECTURAS.create({
    data: {
      TITULO: lectura.titulo,
      FECHA_PUBLICACION: new Date(lectura.fecha_publicacion),
      GENERO: lectura.genero,
      TEXTO: lectura.texto,
      CORRIENTE_LITERARIA: lectura.corriente_literaria,
      PUNTUACION: Number(0),
      AUTORES: {
        connect: {
          ID_AUTOR: Number(lectura.id_autor),
        },
      },
    },
  });
};

module.exports = {
  getLecturas,
  getLectura,
  postLectura,
};
