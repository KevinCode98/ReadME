const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDispositivo = async (uuid_dispositivo, id) => {
  const dispositivoExiste = await prisma.DISPOSITIVOS.findFirst({
    where: {
      UUID_DISPOSITIVO: uuid_dispositivo,
      ID_USUARIO: Number(id),
    },
  });

  if (dispositivoExiste) return { msg: 'REGISTRADO' };
  return { msg: 'NO_REGISTRADO' };
};

const getDispositivosPorId = async (id) => {
  const usuarioExiste = await prisma.USUARIOS.findFirst({
    where: { ID_USUARIO: Number(id) },
  });

  if (!usuarioExiste)
    return { msg: 'El Usuario no se encuentra en la base de datos.' };

  const dispositivos = await prisma.DISPOSITIVOS.findMany({
    where: { ID_USUARIO: Number(id) },
  });

  return dispositivos;
};

const postDispositivo = async (uuid_dispositivo, id) => {
  // Verificar si el uuid_dispositivo existe
  const dispositivoExiste = await prisma.DISPOSITIVOS.findFirst({
    where: {
      UUID_DISPOSITIVO: uuid_dispositivo,
      ID_USUARIO: Number(id),
    },
  });

  if (dispositivoExiste)
    return { msg: 'El dispositivo ya se encuentra en la base de datos' };

  //Guardar en BD
  const dispositivo = await prisma.DISPOSITIVOS.create({
    data: {
      ID_USUARIO: Number(id),
      UUID_DISPOSITIVO: uuid_dispositivo,
    },
  });

  return dispositivo;
};

const deleteDispositivo = async (uuid_dispositivo, id) => {
  const dispositivoExiste = await prisma.DISPOSITIVOS.findFirst({
    where: {
      UUID_DISPOSITIVO: uuid_dispositivo,
      ID_USUARIO: Number(id),
    },
  });

  if (!dispositivoExiste)
    return { msg: 'El dispositivo no se encuentra en la base de datos' };

  const dispositivo = await prisma.DISPOSITIVOS.delete({
    where: {
      ID_DISPOSITIVO: Number(dispositivoExiste.ID_DISPOSITIVO),
    },
  });

  return dispositivo;
};

module.exports = {
  deleteDispositivo,
  getDispositivo,
  getDispositivosPorId,
  postDispositivo,
};
