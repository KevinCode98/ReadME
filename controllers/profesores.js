const { response } = require('express');
const profesoresDB = require('../querys/profesores');

const profesoresGet = async (req, res = response) => {
  try {
    res.status(200).json(await profesoresDB.getProfesores());
  } catch (error) {
    console.error('Error en la petición de base de datos - profesoresGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - profesoresGet',
    });
  }
};

const profesoresNombreGet = async (req, res = response) => {
  try {
    if (Object.keys(req.query.nombre).length == 0)
      res.json(await profesoresDB.getProfesores());
    else res.json(await profesoresDB.getNombresProfesores(req.query.nombre));
  } catch (error) {
    console.error(
      'Error en la petición de base de datos - profesoresNombreGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - profesoresNombreGet',
    });
  }
};

const profesorGet = async (req, res = response) => {
  try {
    const profesor = await profesoresDB.getProfesor(req.params.id);
    if (profesor === null)
      return res
        .status(400)
        .json({ msg: 'El Profesor no existe en la base de datos' });
    res.status(200).json(profesor);
  } catch (error) {
    console.error('Error en la petición de base de datos - profesorGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - profesorGet',
    });
  }
};

const profesorSalasGet = async (req, res = response) => {
  try {
    res.json(await profesoresDB.getProfesorSalas(req.usuario.ID_USUARIO));
  } catch (error) {
    console.error('Error en la petición de base de datos - profesorSalasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - profesorSalasGet',
    });
  }
};

const profesorSalaInscritosGet = async (req, res = response) => {
  try {
    const alumnos = await profesoresDB.getProfesorSalaInscritos(
      req.usuario.ID_USUARIO,
      req.params.sala
    );
    if (alumnos.msg) return res.status(400).json(alumnos);

    res.status(200).json(alumnos);
  } catch (error) {
    console.error(
      'Error en la petición de base de datos - profesorSalaInscritosGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - profesorSalaInscritosGet',
    });
  }
};

const profesorEliminarInscritoSalaDelete = async (req, res = response) => {
  try {
    const inscritos = await profesoresDB.postProfesorEliminarInscrito(
      req.body,
      req.usuario.ID_USUARIO
    );
    if (inscritos.msg) return res.status(400).json(inscritos);

    res.status(200).json(inscritos);
  } catch (error) {
    console.error(
      'Error en la petición de base de datos - profesorEliminarInscritoSalaDelete'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - profesorEliminarInscritoSalaDelete',
    });
  }
};

module.exports = {
  profesoresGet,
  profesoresNombreGet,
  profesorGet,
  profesorSalasGet,
  profesorSalaInscritosGet,
  profesorEliminarInscritoSalaDelete,
};
