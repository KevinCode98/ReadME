const { response, request } = require('express');
const profesoresDB = require('../querys/profesores');

const profesoresGet = async (req, res = response) => {
  try {
    res.json(await profesoresDB.getProfesores());
  } catch (error) {
    console.error('Error en la petición de base de datos - profesoresGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - profesoresGet',
    });
  }
};

const profesorGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await profesoresDB.getProfesor(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - profesorGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - profesorGet',
    });
  }
};

const profesorPost = async (req, res = response) => {
  try {
    res.json(await profesoresDB.postProfesor(req.body));
  } catch (error) {
    console.error('Error en la petición de base de datos - profesorPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - profesorPost',
    });
  }
};

module.exports = {
  profesoresGet,
  profesorGet,
  profesorPost,
};
