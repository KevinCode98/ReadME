const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getTutorado = async (id) => {
  const tutorado = await prisma.TUTORES.findFirst({
    select: {
      NOMBRE: true,
      APELLIDOS: true,
      EMAIL: true,
      PARENTESCO: true,
    },
    where: {
      ID_TUTORADO: Number(id),
    },
  });

  return tutorado;
};

const postTutorado = async (tutorado) => {
  const idTutorado = tutorado.id_tutorado;

  // Verificar si el alumno ya tiene algun tutorado
  const tutoradoExiste = await prisma.TUTORES.findFirst({
    where: {
      ID_TUTORADO: idTutorado,
    },
  });

  if (tutoradoExiste) return { msg: 'El alumno ya tiene un tutorado asignado' };

  const tutoradoDB = await prisma.TUTORES.create({
    data: {
      NOMBRE: tutorado.nombre,
      APELLIDOS: tutorado.apellidos,
      EMAIL: tutorado.email,
      PARENTESCO: tutorado.parentesco,
      USUARIOS: {
        connect: {
          ID_USUARIO: Number(tutorado.id_tutorado),
        },
      },
    },
  });

  return tutoradoDB;
};

module.exports = {
  getTutorado,
  postTutorado,
};
