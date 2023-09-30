const { response } = require('express');
const inscritosDB = require('../querys/inscritos');
const dispositivosDB = require('../querys/dispositivos');
const Notificaciones = require('../helpers/notificaciones');

const inscritosGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await inscritosDB.getInscritos(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - inscritosGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - inscritosGet',
    });
  }
};

const inscritosPost = async (req, res = response) => {
  const id_profesor = req.usuario.ID_USUARIO;
  try {
    const inscritos = await inscritosDB.postInscritos(req.body, id_profesor);
    if (inscritos.msg) return res.status(400).json(inscritos);

    const dispositivos = await dispositivosDB.getDispositivosPorId(
      req.body.id_alumno
    );
    if (dispositivos.msg) return res.status(400).json(dispositivos);

    dispositivos.forEach((dispositivo) => {
      const datosNotificacion = {
        tokenId: dispositivo.UUID_DISPOSITIVO,
        titulo: `Invitación a una nueva sala`,
        mensaje: `Se te ha invitado a la sala: ${inscritos.salaExiste.DESCRIPCION}`,
      };
      Notificaciones.sendPushToOneUser(datosNotificacion);
    });

    res.status(200).json(inscritos);
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de base de datos - inscritosPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - inscritosPost',
    });
  }
};

module.exports = {
  inscritosGet,
  inscritosPost,
};
