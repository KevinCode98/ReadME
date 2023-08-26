const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getSalas = async () => {
  const salas = await prisma.SALAS.findMany({
    select: {
      ID_SALA: true,
      DESCRIPCION: true,
      FECHA_CREACION: true,
      HASH: true,
      USUARIOS: {
        select: {
          NOMBRE: true,
          APELLIDOS: true,
          EMAIL: true,
        },
      },
    },
  });

  return salas;
};

const getSala = async (id) => {
  const sala = await prisma.SALAS.findFirst({
    select: {
      ID_SALA: true,
      DESCRIPCION: true,
      FECHA_CREACION: true,
      HASH: true,
      USUARIOS: {
        select: {
          NOMBRE: true,
          APELLIDOS: true,
          EMAIL: true,
        },
      },
    },
    where: {
      ID_SALA: Number(id),
    },
  });

  return sala;
};

const postSalas = async (id, sala) => {
  // Validar que el Profesor exista en la base de datos
  const responsableExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(id),
      TIPO_USUARIO: 'Profesor',
    },
    select: {
      ID_USUARIO: true,
    },
  });

  if (!responsableExiste)
    return {
      msg: 'El Profesor no existe en la base de datos',
    };

  const hash = generadorHash();

  // Validar si no existe el hash generado
  const hashExiste = await prisma.SALAS.findFirst({
    where: { HASH: hash },
  });

  if (hashExiste) postSalas(id, sala);

  const salaDB = await prisma.SALAS.create({
    data: {
      DESCRIPCION: sala.descripcion,
      FECHA_CREACION: new Date(),
      HASH: hash,
      USUARIOS: {
        connect: {
          ID_USUARIO: Number(id),
        },
      },
    },
  });

  return salaDB;
};

const postAlumnoAceptarSala = async (id, sala) => {
  // Validar que el Alumno exista en la base de datos
  const alumnoExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(id),
      TIPO_USUARIO: 'Alumno',
    },
    select: {
      ID_USUARIO: true,
    },
  });

  if (!alumnoExiste) return { msg: 'El Alumno no existe en la base de datos' };

  // Validar que la sala exista en la base de datos
  const inscritosExiste = await prisma.INSCRITOS.findFirst({
    where: {
      ID_USUARIO: Number(id),
      ID_SALA: Number(sala),
      ACEPTADO: 'NO_ACEPTADO',
    },
    select: {
      ID_INSCRITOS: true,
      ID_SALA: true,
      ID_USUARIO: true,
    },
  });

  if (!inscritosExiste)
    return { msg: 'La peticion no existe en la base de datos' };

  if (
    Number(inscritosExiste.ID_USUARIO) === Number(id) &&
    Number(inscritosExiste.ID_SALA) === Number(sala)
  ) {
    const aceptado = await prisma.INSCRITOS.update({
      where: {
        ID_INSCRITOS: Number(inscritosExiste.ID_INSCRITOS),
      },
      data: {
        ACEPTADO: 'ACEPTADO',
      },
    });
    return aceptado;
  } else {
    return { msg: 'Datos invalidos' };
  }
};

const deleteAlumnoCancelarSala = async (id, sala) => {
  // Validar que el Alumno exista en la base de datos
  const alumnoExiste = await prisma.USUARIOS.findFirst({
    where: {
      ID_USUARIO: Number(id),
      TIPO_USUARIO: 'Alumno',
    },
    select: {
      ID_USUARIO: true,
    },
  });

  if (!alumnoExiste) return { msg: 'El Alumno no existe en la base de datos' };

  // Validar que la sala exista en la base de datos
  const inscritosExiste = await prisma.INSCRITOS.findFirst({
    where: {
      ID_USUARIO: Number(id),
      ID_SALA: Number(sala),
      ACEPTADO: 'NO_ACEPTADO',
    },
    select: {
      ID_INSCRITOS: true,
      ID_SALA: true,
      ID_USUARIO: true,
    },
  });

  if (!inscritosExiste)
    return { msg: 'La peticion no existe en la base de datos' };

  if (
    Number(inscritosExiste.ID_USUARIO) === Number(id) &&
    Number(inscritosExiste.ID_SALA) === Number(sala)
  ) {
    const eliminado = await prisma.INSCRITOS.delete({
      where: {
        ID_INSCRITOS: Number(inscritosExiste.ID_INSCRITOS),
      },
    });
    return eliminado;
  } else {
    return { msg: 'Datos invalidos' };
  }
};

const generadorHash = () => {
  const banco =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let hash = '';

  for (let i = 0; i < 11; i++) {
    hash += banco.charAt(Math.floor(Math.random() * banco.length));
    if (i % 4 == 0 && i != 0) hash += '-';
  }

  return hash;
};

module.exports = {
  getSala,
  getSalas,
  postSalas,
  postAlumnoAceptarSala,
  deleteAlumnoCancelarSala,
};
