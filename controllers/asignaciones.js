const { response } = require('express');
const { existeError } = require('../helpers/validator');
const asignacionesDB = require('../querys/asignaciones');
const inscritosDB = require('../querys/inscritos');
const dispositivosDB = require('../querys/dispositivos');
const Notificaciones = require('../helpers/notificaciones');

const asignacionGet = async (req, res = response) => {
  try {
    res.json(await asignacionesDB.getAsignacion(req.params.id));
  } catch (error) {
    existeError(res, error, 'asignacionGet');
  }
};

const asignacionPost = async (req, res = response) => {
  try {
    const asignacion = await asignacionesDB.postAsignacion(
      req.body,
      req.usuario.ID_USUARIO
    );
    if (asignacion.msg) return res.status(400).json(asignacion);

    const alumnos = await inscritosDB.getInscritosAceptados(
      asignacion.SALAS.ID_SALA
    );

    if (alumnos.length === 0) return res.status(200).json(asignacion);

    alumnos.forEach(async (alumno) => {
      const dispositivosUsuario = await dispositivosDB.getDispositivosPorId(
        alumno.ID_USUARIO
      );

      dispositivosUsuario.forEach((dispositivo) => {
        const datosNotificacion = {
          tokenId: dispositivo.UUID_DISPOSITIVO,
          titulo: `Sala: ${asignacion.SALAS.DESCRIPCION}`,
          mensaje: `Nueva asignación: ${asignacion.TITULO}`,
        };
        Notificaciones.sendPushToOneUser(datosNotificacion);
      });
      res.status(200).json(asignacion);
    });
  } catch (error) {
    existeError(res, error, 'asignacionPost');
  }
};

const asignacionesPorSalaGet = async (req, res = response) => {
  try {
    const asignacion = await asignacionesDB.getAsignacionesPorSala(
      req.params.id
    );
    if (asignacion.msg) return res.status(400).json(asignacion);

    res.status(200).json(asignacion);
  } catch (error) {
    existeError(res, error, 'asignacionesPorSalaGet');
  }
};

const asignacionDelete = async (req, res = response) => {
  try {
    const asignacion = asignacionesDB.deleteAsignacion(
      req.body,
      req.usuario.ID_USUARIO
    );

    if (asignacion.msg) return res.status(400).json(asignacion);
    res.status(200).json(asignacion);
  } catch (error) {
    existeError(res, error, 'asignacionDelete');
  }
};

module.exports = {
  asignacionGet,
  asignacionesPorSalaGet,
  asignacionPost,
  asignacionDelete,
};
