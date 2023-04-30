const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAutores = async () => {
  const autores = await prisma.AUTORES.findMany({
    select: {
      ID_AUTOR: true,
      NOMBRE: true,
      APELLIDO: true,
      LECTURAS: true,
    },
  });

  return autores;
};

const getAutor = async (id) => {
  const autor = await prisma.AUTORES.findMany({
    select: {
      ID_AUTOR: true,
      NOMBRE: true,
      APELLIDO: true,
      LECTURAS: true,
    },
    where: {
      ID_AUTOR: id,
    },
  });

  return autor;
};

const postAutor = async (autor) => {
  const autorDB = await prisma.AUTORES.create({
    data: {
      NOMBRE: autor.nombre,
      APELLIDO: autor.apellido,
      FECHA_NAC: new Date(autor.fecha_nac),
      FECHA_DEFUNCION: new Date(autor.fecha_defuncion),
      NACIONALIDAD: autor.nacionalidad,
    },
  });

  return autorDB;
};

module.exports = {
  getAutor,
  getAutores,
  postAutor,
};
