const { response } = require('express');
const dispositivosDB = require('../querys/dispositivos');

const dispositivosGet = async (req, res = response) => {
  try {
    const id = req.usuario.ID_USUARIO;
    res
      .status(200)
      .json(await dispositivosDB.getDispositivo(req.body.uui_dispositivo, id));
  } catch (error) {
    console.error('Error en la petición de la base de datos - dispositivosGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - dispositivosGet',
    });
  }
};

const dispositivosPost = async (req, res = response) => {
  try {
    const id = req.usuario.ID_USUARIO;
    res
      .status(200)
      .json(
        await dispositivosDB.postDispositivo(req.body.uuid_dispositivo, id)
      );
  } catch (error) {
    console.log(error);
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
    const id = req.params.id;
    const usuarioAutenticadoId = req.usuario.ID_USUARIO;

    if (Number(id) !== Number(usuarioAutenticadoId)) {
      return res.status(401).json({
        msg: `El ID ${usuarioAutenticado.ID_USUARIO} no es propietario de la cuenta`,
      });
    }

    const dispositivo = await dispositivosDB.deleteDispositivo(
      req.body.uuid_dispositivo,
      usuarioAutenticadoId
    );
    if (dispositivo.msg) return res.status(400).json(dispositivo);

    res.status(200).json(dispositivo);
  } catch (error) {
    console.log(error);
    console.error(
      'Error en la petición de la base de datos - dispositivosPost'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - dispositivosPost',
    });
  }
};

module.exports = { dispositivosPost, dispositivosGet, dispositivoDelete };
