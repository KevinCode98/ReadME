const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getValidacion = async (id) => {
  return await prisma.ACTIVACIONES.findFirst({
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
};

const postGenerarActivacion = async (id, tiempo) => {
  return await prisma.ACTIVACIONES.create({
    data: {
      ID_USUARIO: id,
      CODIGO: genearCodigo(),
      TIEMPO: new Date(tiempo),
    },
  });
};

const postValidarActivacion = async (id, codigo, tiempo) => {
  const valoresCodigo = await getValidacion(id);

  // Validar si existe un codigo de validacion
  if (!valoresCodigo)
    return {
      msg: 'El usuario no cuenta con un codigo de validacion',
    };

  // Validar si el codigo tiene menos de 15 minutos
  var fechaDB = new Date(valoresCodigo.TIEMPO);
  var fechaActual = new Date(tiempo);
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

  return await prisma.USUARIOS.update({
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
};

const postActualizarCodigo = async (id, tiempo) => {
  const valoresCodigo = await getValidacion(id);

  if (!valoresCodigo) {
    return postGenerarActivacion(id, tiempo);
  }

  const activacion = await prisma.ACTIVACIONES.update({
    data: {
      CODIGO: genearCodigo(),
      TIEMPO: new Date(tiempo),
    },
    where: {
      ID_CODIGO: Number(valoresCodigo.ID_CODIGO),
    },
  });

  return activacion;
};

const genearCodigo = () => {
  const banco = '0123456789';
  let aleatoria = '';
  for (let i = 0; i < 4; i++)
    aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
  return aleatoria;
};

module.exports = {
  getValidacion,
  postActualizarCodigo,
  postValidarActivacion,
};
