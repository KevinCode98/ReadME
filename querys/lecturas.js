const { PrismaClient } = require('@prisma/client');
const autoresDB = require('../querys/autores');

const prisma = new PrismaClient();

const getLecturas = async () => {
  const lecturas = await prisma.LECTURAS.findMany({
    select: {
      ID_LECTURA: true,
      TITULO: true,
      TEMATICAS: {
        select: {
          ID_TEMATICA: true,
          NOMBRE: true,
        },
      },
      ID_LECTURA: true,
      CORRIENTES: {
        select: {
          ID_CORRIENTE: true,
          NOMBRE: true,
        },
      },
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

const getLectura = async (id, retornaTexto = false) => {
  const lectura = await prisma.LECTURAS.findFirst({
    where: {
      ID_LECTURA: Number(id),
    },
    select: {
      ID_LECTURA: true,
      TITULO: true,
      TEMATICAS: {
        select: {
          ID_TEMATICA: true,
          NOMBRE: true,
        },
      },
      CORRIENTES: {
        select: {
          ID_CORRIENTE: true,
          NOMBRE: true,
        },
      },
      TEXTO: retornaTexto,
      FECHA_PUBLICACION: true,
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
      TEMATICAS: {
        select: {
          ID_TEMATICA: true,
          NOMBRE: true,
        },
      },
      CORRIENTES: {
        select: {
          ID_CORRIENTE: true,
          NOMBRE: true,
        },
      },
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

  // Ingreso de lecturas por coincidencia de palabras en el libro
  const lecturasPorPalabras = await prisma.LECTURAS.findMany({
    select: {
      ID_LECTURA: true,
      TITULO: true,
      TEMATICAS: {
        select: {
          ID_TEMATICA: true,
          NOMBRE: true,
        },
      },
      CORRIENTES: {
        select: {
          ID_CORRIENTE: true,
          NOMBRE: true,
        },
      },
      AUTORES: {
        select: {
          NOMBRE: true,
          APELLIDOS: true,
          ID_AUTOR: true,
        },
      },
    },
    where: {
      TEXTO: {
        contains: buscar,
      },
    },
  });

  for (const libro of lecturasPorPalabras) {
    // Valida si el libro ya fue ingresado al arreglo
    const found = lecturas.some(
      (lectura) => lectura.ID_LECTURA === libro.ID_LECTURA
    );
    if (!found) {
      lecturas.push(libro);
    }
  }

  return lecturas;
};

const postLectura = async (lectura, textoLectura) => {
  return await prisma.LECTURAS.create({
    data: {
      TITULO: lectura.titulo,
      FECHA_PUBLICACION: new Date(lectura.fecha_publicacion),
      TEMATICAS: {
        connect: {
          ID_TEMATICA: Number(lectura.tematica),
        },
      },
      TEXTO: textoLectura,
      CORRIENTES: {
        connect: {
          ID_CORRIENTE: Number(lectura.corriente_literaria),
        },
      },
      PUNTUACION: Number(0),
      AUTORES: {
        connect: {
          ID_AUTOR: Number(lectura.id_autor),
        },
      },
    },
  });
};

const lecturasPorAutor = async (id) => {
  const lecturas = await prisma.LECTURAS.findMany({
    select: {
      ID_LECTURA: true,
      TITULO: true,
      TEMATICAS: {
        select: {
          ID_TEMATICA: true,
          NOMBRE: true,
        },
      },
      CORRIENTES: {
        select: {
          ID_CORRIENTE: true,
          NOMBRE: true,
        },
      },
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
