const { response } = require('express');
const progresosDB = require('../querys/progresos');

const progresosPorIdGet = async (req, res = response) => {
  const id = req.usuario.ID_USUARIO;

  try {
    res.status(200).json(await progresosDB.getProgresoPorId(id));
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de base de datos - progresosPorIdGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - progresosPorIdGet',
    });
  }
};

const progresosPost = async (req, res = response) => {
  const id = req.usuario.ID_USUARIO;

  try {
    const progreso = await progresosDB.postProgreso(req.body, id);
    if (progreso.msg) return res.status(400).json(progreso);

    res.status(200).json(progreso);
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de base de datos - progresosPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - progresosPost',
    });
  }
};

module.exports = {
  progresosPorIdGet,
  progresosPost,
};
