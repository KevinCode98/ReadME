const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAutores = async () => {
  return await prisma.AUTORES.findMany({
    select: {
      ID_AUTOR: true,
      NOMBRE: true,
      APELLIDOS: true,
      LECTURAS: true,
    },
  });
};

const getNombresAutores = async (buscar) => {
  return await prisma.AUTORES.findMany({
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
};

const getAutor = async (id) => {
  return await prisma.AUTORES.findFirst({
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
};

const postAutor = async (autor) => {
  return await prisma.AUTORES.create({
    data: {
      NOMBRE: autor.nombre,
      APELLIDOS: autor.apellidos,
      BIBLIOGRAFIA: autor.bibliografia,
      FECHA_NAC: new Date(autor.fecha_nac),
      FECHA_DEFUNCION: new Date(autor.fecha_defuncion),
      NACIONALIDAD: Number(autor.nacionalidad),
    },
  });
};

const postActualizarAutor = async (autor, id) => {
  return await prisma.AUTORES.update({
    data: {
      NOMBRE: autor.nombre,
      APELLIDOS: autor.apellidos,
      BIBLIOGRAFIA: autor.bibliografia,
      FECHA_NAC: new Date(autor.fecha_nac),
      FECHA_DEFUNCION: new Date(autor.fecha_defuncion),
      NACIONALIDAD: autor.nacionalidad ? Number(autor.nacionalidad) : null,
    },
    where: {
      ID_AUTOR: Number(id),
    },
  });
};

module.exports = {
  getAutor,
  getAutores,
  getNombresAutores,
  postActualizarAutor,
  postAutor,
};
