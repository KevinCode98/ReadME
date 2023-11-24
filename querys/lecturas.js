const { PrismaClient } = require('@prisma/client');
const autoresDB = require('../querys/autores');
const tematicasDB = require('../querys/tematicas');

const prisma = new PrismaClient();

const getLecturas = async () => {
  const arrayTematicas = await tematicasDB.getArrayTematicas();

  const librosTematicas = {};
  for (const tematica of arrayTematicas) {
    librosTematicas[tematica] = [];
  }

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
      PUNTUACION: true,
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

  lecturas.forEach((lectura) => {
    let arrayAux = librosTematicas[lectura.TEMATICAS.NOMBRE];
    arrayAux.push(lectura);

    Object.assign(librosTematicas[lectura.TEMATICAS.NOMBRE], arrayAux);
  });
  const libros = []
  for(const key in librosTematicas){
    const objAux = {
      "TEMATICA" : key,
      "LECTURAS" : librosTematicas[key]
    }
    libros.push(objAux);
  }
  return libros;
};

const getLecturasSinTematica = async () => {
  return await prisma.LECTURAS.findMany({
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
      PUNTUACION: true,
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
};

const getLectura = async (id, retornaTexto = false, id_alumno = 0) => {
  const lectura = await prisma.LECTURAS.findFirst({
    where: {
      ID_LECTURA: Number(id),
    },
    select: {
      ID_LECTURA: true,
      PUNTUACION: true,
      TITULO: true,
      PUNTUACIONES: {
        select: {
          PUNTUACION: true,
        },
        where: {
          ID_USUARIO: Number(id_alumno),
        },
      },
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
      TEXTO: true,
      FECHA_PUBLICACION: true,
      AUTORES: {
        select: {
          NOMBRE: true,
          APELLIDOS: true,
        },
      },
    },
  });

  if (!lectura) {
    return null;
  } else {
    if (retornaTexto) {
      return lectura;
    } else {
      const texto = lectura.TEXTO;
      const palabras = texto.split(' ');
      const primerasPalabras = palabras.slice(0, 100);
      lectura.TEXTO = primerasPalabras.join(' ');

      return lectura;
    }
  }
};

const getLecturaConFiltros = async (filtros) => {
  // TODO: Enviarlas por tematica -> Get lectura normal
  const arrayTematicas = await tematicasDB.getArrayTematicas();

  const librosTematicas = {};
  for (const tematica of arrayTematicas) {
    librosTematicas[tematica] = [];
  }

  // validar si la tematica existe
  if (filtros.tematica) {
    const existeTematica = await prisma.TEMATICAS.findFirst({
      where: { ID_TEMATICA: Number(filtros.tematica) },
    });

    if (!existeTematica)
      return { msg: 'La Tematica no existe en la base de datos' };
  }

  // validar si el autor existe
  if (filtros.autor) {
    const existeAutor = await prisma.AUTORES.findFirst({
      where: { ID_AUTOR: Number(filtros.autor) },
    });

    if (!existeAutor) return { msg: 'El Autor no existe en la base de datos' };
  }

  // validar si la corriente existe
  if (filtros.corriente) {
    const existeCorriente = await prisma.CORRIENTES.findFirst({
      where: { ID_CORRIENTE: Number(filtros.corriente) },
    });

    if (!existeCorriente)
      return { msg: 'La Corriente no existe en la base de datos' };
  }

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
      ID_TEMATICA: filtros.tematica ? Number(filtros.tematica) : undefined,
      ID_AUTOR: filtros.autor ? Number(filtros.autor) : undefined,
      ID_CORRIENTE: filtros.corriente ? Number(filtros.corriente) : undefined,
    },
  });

  lecturas.forEach((lectura) => {
    let arrayAux = librosTematicas[lectura.TEMATICAS.NOMBRE];
    arrayAux.push(lectura);

    Object.assign(librosTematicas[lectura.TEMATICAS.NOMBRE], arrayAux);
  });

  const libros = [];
  for (const key in librosTematicas) {
    const objAux = {
      TEMATICA: key,
      LECTURAS: librosTematicas[key],
    };
    libros.push(objAux);
  }
  return libros;
};

const getLecturaInfo = async (id_lectura) => {
  return await prisma.LECTURAS.findMany({
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
    where: {
      ID_LECTURA: Number(id_lectura),
    },
  });
};

const getLecturaInfoRecomendacion = async (id_lectura) => {
  return await prisma.LECTURAS.findMany({
    select: {
      ID_LECTURA: true,
      TITULO: true,
      PUNTUACION: true,
      AUTORES: {
        select: {
          NOMBRE: true,
          APELLIDOS: true,
        },
      },
    },
    where: {
      ID_LECTURA: Number(id_lectura),
    },
  });
};

const getLecturasLeidas = async (id_alumno) => {
  const lecturasDB = await prisma.LEIDOS.findMany({
    where: {
      ID_USUARIO: Number(id_alumno),
    },
    select: {
      ID_LEIDO: true,
      FECHA_INICIO: true,
      FECHA_FINAL: true,
      ID_LECTURA: true,
      LECTURAS: {
        select: {
          TITULO: true,
          PUNTUACION: true,
          AUTORES: {
            select: {
              NOMBRE: true,
              APELLIDOS: true,
            },
          },
        },
      },
    },
  });

  let lecturas = [];
  lecturasDB.forEach((lectura) => {
    if (!lecturas.some((obj) => obj.ID_LECTURA === lectura.ID_LECTURA))
      lecturas.push(lectura);
  });

  return lecturas;
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
  return await prisma.LECTURAS.findMany({
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
};

const actualizarPuntuacionLectura = async (id_lectura, promedio) => {
  return await prisma.LECTURAS.update({
    data: {
      PUNTUACION: Number(promedio),
    },
    where: {
      ID_LECTURA: Number(id_lectura),
    },
    select: {
      ID_LECTURA: true,
      TITULO: true,
      PUNTUACION: true,
    },
  });
};

module.exports = {
  actualizarPuntuacionLectura,
  getLectura,
  getLecturaConFiltros,
  getLecturaInfo,
  getLecturaInfoRecomendacion,
  getLecturas,
  getLecturasLeidas,
  getLecturasSinTematica,
  getNombreLecturas,
  postLectura,
};
