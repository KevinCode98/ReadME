const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();

const getAlumnos = async () => {
  const alumnos = await prisma.USUARIOS.findMany({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDOS: true,
      EMAIL: true,
      APODO: true,
    },
    where: {
      TIPO_USUARIO: 'Alumno',
    },
  });

  return alumnos;
};

const getAlumno = async (id) => {
  const alumno = await prisma.USUARIOS.findMany({
    select: {
      ID_USUARIO: true,
      NOMBRE: true,
      APELLIDOS: true,
      EMAIL: true,
      APODO: true,
    },
    where: {
      TIPO_USUARIO: 'Estudiante',
      ID_USUARIO: Number(id),
    },
  });

  return alumno;
};

const postAlumno = async (alumno) => {
  const { email, password } = alumno;

  // Verificar si el correo existe
  const alumnoExiste = await prisma.USUARIOS.findFirst({
    where: {
      EMAIL: email,
    },
  });

  if (alumnoExiste)
    return { msg: 'El usuario ya se encuentra en la base de datos' };

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  alumno.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  const alumnoDB = await prisma.USUARIOS.create({
    data: {
      NOMBRE: alumno.nombre,
      APELLIDOS: alumno.apellidos,
      FECHA_NAC: new Date(alumno.nacimiento),
      TIPO_USUARIO: 'Alumno',
      EMAIL: alumno.email,
      PWD: alumno.password,
      FECHA_ALTA: new Date(),
      APODO: alumno.apodo,
      FOTO: alumno.foto,
      NIVEL: alumno.nivel,
      STATUS: 'CREADO'
    },
  });

  delete alumnoDB.PWD;
  return alumnoDB;
};

module.exports = {
  getAlumnos,
  getAlumno,
  postAlumno,
};
