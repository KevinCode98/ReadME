const { response } = require('express');
const { existeError } = require('../helpers/validator');
const inscritosDB = require('../querys/inscritos');
const dispositivosDB = require('../querys/dispositivos');
const Notificaciones = require('../helpers/notificaciones');

const inscritosGet = async (req, res = response) => {
  try {
    res.json(await inscritosDB.getInscritos(req.params.id));
  } catch (error) {
    existeError(res, error, 'inscritosGet');
  }
};

const inscritosPost = async (req, res = response) => {
  try {
    const inscritos = await inscritosDB.postInscritos(
      req.body,
      req.usuario.ID_USUARIO
    );
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
    existeError(res, error, 'inscritosPost');
  }
};

const inscritosHashPost = async (req, res = response) => {
  try {
    const inscrito = await inscritosDB.postInscritosHash(
      req.body.hash,
      req.usuario.ID_USUARIO
    );
    if (inscrito.msg) return res.status(400).json(inscrito);
    res.status(200).json(inscrito);
  } catch (error) {
    existeError(res, error, 'inscritosHashPost');
  }
};

module.exports = {
  inscritosGet,
  inscritosPost,
  inscritosHashPost,
};
