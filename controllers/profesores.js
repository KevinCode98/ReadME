const { response } = require('express');
const { existeError } = require('../helpers/validator');
const profesoresDB = require('../querys/profesores');

const profesoresGet = async (req, res = response) => {
  try {
    res.status(200).json(await profesoresDB.getProfesores());
  } catch (error) {
    existeError(res, error, 'profesoresGet');
  }
};

const profesoresNombreGet = async (req, res = response) => {
  try {
    if (Object.keys(req.query.nombre).length == 0)
      res.json(await profesoresDB.getProfesores());
    else res.json(await profesoresDB.getNombresProfesores(req.query.nombre));
  } catch (error) {
    existeError(res, error, 'profesoresNombreGet');
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
    existeError(res, error, 'profesorGet');
  }
};

const profesorSalasGet = async (req, res = response) => {
  try {
    res.json(await profesoresDB.getProfesorSalas(req.usuario.ID_USUARIO));
  } catch (error) {
    existeError(res, error, 'profesorSalasGet');
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
    existeError(res, error, 'profesorSalaInscritosGet');
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
    existeError(res, error, 'profesorEliminarInscritoSalaDelete');
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
