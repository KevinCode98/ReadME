const { response, request } = require('express');
const profesoresDB = require('../querys/profesores');
const activacionDB = require('../querys/activaciones');

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
    const profesor = await profesoresDB.postProfesor(req.body);
    if (profesor.profesorDB)
      await activacionDB.postActualizarCodigo(profesor.profesorDB.ID_USUARIO);

    res.json(profesor);
  } catch (error) {
    console.error('Error en la petición de base de datos - profesorPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - profesorPost',
    });
  }
};

const profesorDelete = async (req, res = response) => {
  const id = req.params.id;

  try {
    const profesorAutenticado = req.usuario;
    if (Number(id) !== Number(profesorAutenticado.ID_USUARIO)) {
      return res.status(401).json({
        msg: `El ID ${profesorAutenticado.ID_USUARIO} no es el propetario de la cuenta`,
      });
    }

    res.json(await profesoresDB.deleteProfesor(id));
  } catch (error) {
    console.error('Error enl a petición de la base de datos - profesorDelete');
    return res.status(500).json({
      msg: 'Hable con el administrador - profesorDelete',
    });
  }
};

module.exports = {
  profesoresGet,
  profesorGet,
  profesorPost,
  profesorDelete,
};
