const { response } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const esPropietarioSala = async (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere verificar el id sin validar el token primero',
    });
  }

  const { ID_USUARIO } = req.usuario;
  const id = req.params.id;

  const { ID_SALA, ID_RESPONSABLE } = await prisma.SALAS.findUnique({
    select: {
      ID_SALA: true,
      ID_RESPONSABLE: true,
    },
    where: {
      ID_SALA: Number(id),
    },
  });

  if (ID_USUARIO !== ID_RESPONSABLE) {
    return res.status(401).json({
      msg: `El ID ${ID_USUARIO} no es el propietario de la sala ${ID_SALA}`,
    });
  }
  next();
};

module.exports = {
  esPropietarioSala,
};
