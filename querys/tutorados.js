const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const tutoradoGet = async (id) => {
  const tutorado = await prisma.TUTORES.findMany({
    select: {
      NOMBRE: true,
      APELLIDO: true,
      EMAIL: true,
      PARENTESCO: true,
    },
    where: {
      ID_TUTORADO: id,
    },
  });

  return tutorado;
};

const tutoradoPost = async (tutorado) => {
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
      APELLIDO: tutorado.apellido,
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
  tutoradoGet,
  tutoradoPost,
};
