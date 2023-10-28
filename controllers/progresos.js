const { response } = require('express');
const progresosDB = require('../querys/progresos');

const progresosPorIdGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await progresosDB.getProgresoPorId(req.usuario.ID_USUARIO));
  } catch (error) {
    console.error('Error en la petición de base de datos - progresosPorIdGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - progresosPorIdGet',
    });
  }
};

const progresosPorDia = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await progresosDB.getProgresosPorDia(
          req.usuario.ID_USUARIO,
          req.body.fecha
        )
      );
  } catch (error) {
    console.error('Error en la petición de base de datos - progresosPorDia');
    return res.status(500).json({
      msg: 'Hable con el administrador - progresosPorDia',
    });
  }
};

const progresosPorLecturaAlumnoGet = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(
        await progresosDB.getProgresoPorLectura(
          req.usuario.ID_USUARIO,
          req.params.id
        )
      );
  } catch (error) {
    console.error(
      'Error en la petición de base de datos - progresosPorAlumnoGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - progresosPorAlumnoGet',
    });
  }
};

const progresosPost = async (req, res = response) => {
  try {
    const progreso = await progresosDB.postProgreso(
      req.body,
      req.usuario.ID_USUARIO
    );
    if (progreso.msg) return res.status(400).json(progreso);

    res.status(200).json(progreso);
  } catch (error) {
    console.error('Error en la petición de base de datos - progresosPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - progresosPost',
    });
  }
};

module.exports = {
  progresosPorIdGet,
  progresosPorLecturaAlumnoGet,
  progresosPorDia,
  progresosPost,
};
