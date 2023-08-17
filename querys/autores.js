const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAutores = async () => {
  const autores = await prisma.AUTORES.findMany({
    select: {
      ID_AUTOR: true,
      NOMBRE: true,
      APELLIDOS: true,
      LECTURAS: true,
    },
  });

  return autores;
};

const getNombresAutores = async (buscar) => {
  const autores = await prisma.AUTORES.findMany({
    select: {
      ID_AUTOR: true,
      NOMBRE: true,
      APELLIDOS: true,
    },
    where: {
      OR: [
        {
          NOMBRE: {
            contains: buscar,
          },
        },
        {
          APELLIDOS: {
            contains: buscar,
          },
        },
      ],
    },
  });

  return autores;
};
const getAutor = async (id) => {
  const autor = await prisma.AUTORES.findFirst({
    select: {
      ID_AUTOR: true,
      NOMBRE: true,
      APELLIDOS: true,
      LECTURAS: true,
      BIBLIOGRAFIA: true,
      NACIONALIDADES: {
        select: {
          CODIGO_ISO: true,
          DESCRIPCION: true,
        },
      },
    },
    where: {
      ID_AUTOR: Number(id),
    },
  });

  return autor;
};

const postAutor = async (autor) => {
  const autorDB = await prisma.AUTORES.create({
    data: {
      NOMBRE: autor.nombre,
      APELLIDOS: autor.apellidos,
      BIBLIOGRAFIA: autor.bibliografia,
      FECHA_NAC: new Date(autor.fecha_nac),
      FECHA_DEFUNCION: new Date(autor.fecha_defuncion),
      NACIONALIDAD: Number(autor.nacionalidad),
    },
  });

  return autorDB;
};

const postActualizarAutor = async (autor, id) => {
  const autorDB = await prisma.AUTORES.update({
    data: {
      NOMBRE: autor.nombre,
      APELLIDOS: autor.apellidos,
      BIBLIOGRAFIA: autor.bibliografia,
      FECHA_NAC: new Date(autor.fecha_nac),
      FECHA_DEFUNCION: new Date(autor.fecha_defuncion),
      NACIONALIDADES: {
        connect: {
          NACIONALIDAD: Number(autor.nacionalidad),
        },
      },
    },
    where: {
      ID_AUTOR: Number(id),
    },
  });

  return autorDB;
};

module.exports = {
  getAutor,
  getAutores,
  getNombresAutores,
  postActualizarAutor,
  postAutor,
};
