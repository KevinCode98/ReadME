const { response } = require('express');
const dispositivosDB = require('../querys/dispositivos');

const dispositivosGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await dispositivosDB.getDispositivo(
          req.body.uui_dispositivo,
          req.usuario.ID_USUARIO
        )
      );
  } catch (error) {
    console.error('Error en la petición de la base de datos - dispositivosGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - dispositivosGet',
    });
  }
};

const dispositivosPorIdGet = async (req, res = response) => {
  try {
    const dispositivos = await dispositivosDB.getDispositivosPorId(
      req.usuario.ID_USUARIO
    );
    if (dispositivos.msg) return res.status(400).json(dispositivos);

    res.status(200).json(dispositivos);
  } catch (error) {
    console.error(
      'Error en la petición de la base de datos - dispositivosPorIdGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - dispositivosPorIdGet',
    });
  }
};

const dispositivosPost = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await dispositivosDB.postDispositivo(
          req.body.uuid_dispositivo,
          req.usuario.ID_USUARIO
        )
      );
  } catch (error) {
    console.error(
      'Error en la petición de la base de datos - dispositivosPost'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - dispositivosPost',
    });
  }
};

const dispositivoDelete = async (req, res = response) => {
  try {
    if (Number(req.params.id) !== Number(req.usuario.ID_USUARIO)) {
      return res.status(401).json({
        msg: `El ID ${usuarioAutenticado.ID_USUARIO} no es propietario de la cuenta`,
      });
    }

    const dispositivo = await dispositivosDB.deleteDispositivo(
      req.body.uuid_dispositivo,
      req.usuario.ID_USUARIO
    );
    if (dispositivo.msg) return res.status(400).json(dispositivo);

    res.status(200).json(dispositivo);
  } catch (error) {
    console.error(
      'Error en la petición de la base de datos - dispositivosPost'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - dispositivosPost',
    });
  }
};

module.exports = {
  dispositivoDelete,
  dispositivosGet,
  dispositivosPorIdGet,
  dispositivosPost,
};
