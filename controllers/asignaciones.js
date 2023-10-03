const { response } = require('express');
const asignacionesDB = require('../querys/asignaciones');

const asignacionGet = async (req, res = response) => {
  try {
    res.json(await asignacionesDB.getAsignacion(req.params.id));
  } catch (error) {
    console.error('Error en la petición de base de datos - asignacionGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - asignacionGet',
    });
  }
};

const asignacionPost = async (req, res = response) => {
  try {
    const asignacion = await asignacionesDB.postAsignacion(
      req.body,
      req.usuario.ID_USUARIO
    );
    if (asignacion.msg) return res.status(400).json(asignacion);
    res.status(200).json(asignacion);

    const alumnos = await salasDB.getUsuariosPorSala(asignacion.ID_SALA);

    alumnos.forEach(async (alumno) => {
      const dispositivosUsuario = await dispositivosDB.getDispositivosPorId(
        alumno.ID_USUARIO
      );

      dispositivosUsuario.forEach((dispositivo) => {
        const datosNotificacion = {
          tokenId: dispositivo.UUID_DISPOSITIVO,
          titulo: `Nueva asignación`,
          mensaje: `Nueva tarea: ${asignacion.TITULO}`,
        };
        Notificaciones.sendPushToOneUser(datosNotificacion);
      });
    });
  } catch (error) {
    console.error('Error en la petición de base de datos - asignacionPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - asignacionPost',
    });
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
    console.error(
      'Error en la petición de base de datos - asignacionesPorSalaGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - asignacionesPorSalaGet',
    });
  }
};

module.exports = {
  asignacionGet,
  asignacionesPorSalaGet,
  asignacionPost,
};
