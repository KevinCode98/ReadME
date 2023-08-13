const { PrismaClient } = require('@prisma/client');
const autoresDB = require('../querys/autores');

const prisma = new PrismaClient();

const getLecturas = async () => {
  const lecturas = await prisma.LECTURAS.findMany({
    select: {
      ID_LECTURA: true,
      TITULO: true,
      GENERO: true,
      ID_LECTURA: true,
      CORRIENTE_LITERARIA: true,
      PUNTUACION: true,
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
  const lectura = await prisma.LECTURAS.findUnique({
    where: {
      ID_LECTURA: Number(id),
    },
    select: {
      ID_LECTURA: true,
      TITULO: true,
      GENERO: true,
      TEXTO: true,
      AUTORES: {
        select: {
          NOMBRE: true,
          APELLIDOS: true,
        },
      },
    },
  });

  return lectura;
};

const getNombreLecturas = async (buscar) => {
  let autores;

  // Ingreso de lecturas por Titulo
  let lecturas = await prisma.LECTURAS.findMany({
    select: {
      ID_LECTURA: true,
      TITULO: true,
      GENERO: true,
      TEXTO: true,
      AUTORES: {
        select: {
          NOMBRE: true,
          APELLIDOS: true,
          ID_AUTOR: true,
        },
      },
    },
    where: {
      TITULO: {
        contains: buscar,
      },
    },
  });

  // Ingreso de lecturas por Nombre o Apellido del autor
  if (buscar) autores = await autoresDB.getNombresAutores(buscar);
  if (autores) {
    for (const autor of autores) {
      // Obtiene los libros que tiene un autor
      const libros = await lecturasPorAutor(autor.ID_AUTOR);
      for (const libro of libros) {
        // Valida si el libro ya fue ingresado al arreglo
        const found = lecturas.some(
          (lectura) => lectura.ID_LECTURA === libro.ID_LECTURA
        );
        if (!found) {
          lecturas.push(libro);
        }
      }
    }
  }

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

  if (!autorExiste) return { msg: 'El Autor no existe en la base de datos' };

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

  return lecturaDB;
};

const lecturasPorAutor = async (id) => {
  const lecturas = await prisma.LECTURAS.findMany({
    select: {
      ID_LECTURA: true,
      TITULO: true,
      GENERO: true,
      TEXTO: true,
      AUTORES: {
        select: {
          NOMBRE: true,
          APELLIDOS: true,
          ID_AUTOR: true,
        },
      },
    },
    where: {
      ID_AUTOR: Number(id),
    },
  });

  return lecturas;
};

module.exports = {
  getLecturas,
  getLectura,
  postLectura,
  getNombreLecturas,
};
