const { response, request } = require('express');
const lecturaDB = require('../querys/lecturas');

const lecturasGet = async (req, res = responese) => {
  try {
    res.json(await lecturaDB.getLecturas());
  } catch (error) {
    console.error('Error en la petición de base de datos - lecturasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturasGet',
    });
  }
};

const lecturaGet = async (req, res = responese) => {
  const id = req.params.id;

  try {
    res.json(await lecturaDB.getLectura(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - lecturasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturasGet',
    });
  }
};

const lecturaNombreGet = async (req, res = response) => {
  const nombre = req.query.nombre;

  try {
    if (Object.keys(nombre).length == 0)
      return res.json(await lecturaDB.getLecturas());
    else return res.json(await lecturaDB.getNombreLecturas(nombre));
  } catch (error) {
    console.error('Error en la petición de base de datos - lecturaNombreGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturaNombreGet',
    });
  }
};

const lecturaPost = async (req, res = response) => {
  try {
    res.json(await lecturaDB.postLectura(req.body));
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de base de datos - lecturaPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturaPost',
    });
  }
};

module.exports = {
  lecturaGet,
  lecturasGet,
  lecturaNombreGet,
  lecturaPost,
};
