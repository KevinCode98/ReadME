const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const postGenerarActivacion = async (id) => {
  const activacionDB = await prisma.ACTIVACIONES.create({
    data: {
      ID_USUARIO: id,
      CODIGO: genearCodigo(),
      TIEMPO: new Date(),
    },
  });

  return activacionDB;
};

const postValidarActivacion = async (id, codigo) => {
  const valoresCodigo = await prisma.ACTIVACIONES.findFirst({
    select: {
      ID_CODIGO: true,
      ID_USUARIO: true,
      CODIGO: true,
      TIEMPO: true,
    },
    where: {
      ID_USUARIO: Number(id),
    },
  });

  // Validar si existe un codigo de validacion
  if (!valoresCodigo)
    return {
      msg: 'El usuario no cuenta con un codigo de validacion',
    };

  // Validar si el codigo tiene menos de 15 minutos
  var fechaDB = new Date(valoresCodigo.TIEMPO);
  var fechaActual = new Date();
  var tiempo = fechaActual.getTime() - fechaDB.getTime();
  var minutos = Math.round(tiempo / 60000);

  if (minutos > 16)
    return {
      msg: 'Ha expirado el codigo',
    };

  // Validar si los codigos no son inguales
  if (codigo != valoresCodigo.CODIGO)
    return {
      msg: 'El codigo no es valido',
    };

  // Se valido el codigo -> Se elimina la peticion en la base de datos
  await prisma.ACTIVACIONES.delete({
    where: {
      ID_CODIGO: Number(valoresCodigo.ID_CODIGO),
    },
  });

  const usuario = await prisma.USUARIOS.update({
    where: {
      ID_USUARIO: Number(id),
    },
    data: {
      STATUS: 'ONLINE',
    },
    select: {
      ID_USUARIO: true,
      TIPO_USUARIO: true,
    },
  });

  return usuario;
};

const postActualizarCodigo = async (id) => {
  const valoresCodigo = await prisma.ACTIVACIONES.findFirst({
    select: {
      ID_CODIGO: true,
      ID_USUARIO: true,
      CODIGO: true,
      TIEMPO: true,
    },
    where: {
      ID_USUARIO: Number(id),
    },
  });

  if (!valoresCodigo) {
    return postGenerarActivacion(id);
  }

  await prisma.ACTIVACIONES.update({
    data: {
      CODIGO: genearCodigo(),
      TIEMPO: new Date(),
    },
    where: {
      ID_CODIGO: valoresCodigo.ID_CODIGO,
    },
  });

  return { validacion: 'ACTUALIZADO' };
};

const genearCodigo = () => {
  const banco = '0123456789';
  let aleatoria = '';
  for (let i = 0; i < 4; i++)
    aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
  return aleatoria;
};

module.exports = {
  postActualizarCodigo,
  postValidarActivacion,
};
