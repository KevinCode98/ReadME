const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    });
  }

  try {
    const { id_usuario } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    req.id_usuario = id_usuario;

    // Leer el usuario que corresponde al id_usuario
    const usuario = await prisma.USUARIOS.findFirst({
      select: {
        ID_USUARIO: true,
        NOMBRE: true,
        APELLIDOS: true,
        EMAIL: true,
        APODO: true,
        STATUS: true,
      },
      where: {
        ID_USUARIO: Number(id_usuario),
      },
    });

    // No existe el usuario
    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no válido - alumno no existente en la DB',
      });
    }

    // Tiene un estado diferente a eliminado
    if (usuario.STATUS === 'ELIMINADO') {
      return res.status(401).json({
        msg: 'Token no válido - alumno estado ELIMINADO',
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};

module.exports = {
  validarJWT,
};
