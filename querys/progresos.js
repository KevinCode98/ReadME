const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProgresoPorId = async (id) => {
  const progresos = await prisma.PROGRESOS.findMany({
    where: {
      ID_USUARIO: Number(id),
    },
  });

  return progresos;
};

const getProgresoPorLectura = async (id, lectura) => {
  const progresos = await prisma.PROGRESOS.findMany({
    where: {
      ID_USUARIO: Number(id),
      ID_LECTURA: Number(lectura),
    },
  });

  return progresos;
};

const postProgreso = async (progreso, id) => {
  const { id_lectura, tiempo, fecha } = progreso;

  // Validar que el usuario exista en la base de datos
  const usuarioExiste = await prisma.USUARIOS.findFirst({
    where: { ID_USUARIO: Number(id) },
  });

  if (!usuarioExiste)
    return { msg: 'El usuario no existe en la base de datos' };

  // Vakudar que la lectura exista en la base de datos
  const lecturaExiste = await prisma.LECTURAS.findFirst({
    where: { ID_LECTURA: Number(id_lectura) },
  });

  if (!lecturaExiste)
    return { msg: 'La lectura no existe en la base de datos' };

  const progresoDB = await prisma.PROGRESOS.create({
    data: {
      ID_USUARIO: Number(usuarioExiste.ID_USUARIO),
      ID_LECTURA: Number(lecturaExiste.ID_LECTURA),
      TIEMPO: Number(tiempo),
      FECHA: fecha,
    },
  });

  return progresoDB;
};

module.exports = {
  getProgresoPorId,
  getProgresoPorLectura,
  postProgreso,
};
