const { response } = require('express');
const alumnosDB = require('../querys/alumnos');
const { existeError } = require('../helpers/validator');

const alumnosGet = async (req, res = response) => {
  try {
    res.status(200).json(await alumnosDB.getAlumnos());
  } catch (error) {
    existeError(res, error, 'alumnosGet');
  }
};

const alumnosNombreGet = async (req, res = response) => {
  try {
    if (Object.keys(req.query.nombre).length == 0)
      res.json(await alumnosDB.getAlumnos());
    else res.json(await alumnosDB.getNombresAlumnos(req.query.nombre));
  } catch (error) {
    existeError(res, error, 'alumnosNombreGet');
  }
};

const alumnoGet = async (req, res = response) => {
  try {
    const alumno = await alumnosDB.getAlumno(req.params.id);
    if (alumno === null)
      return res
        .status(400)
        .json({ msg: 'El Alumno no existe en la base de datos' });
    res.status(200).json(alumno);
  } catch (error) {
    existeError(res, error, 'alumnoGet');
  }
};

const alumnoSalasInscritasGet = async (req, res = response) => {
  try {
    const salas = await alumnosDB.getAlumnoSalasInscritas(
      req.usuario.ID_USUARIO
    );
    if (salas.msg) return res.status(400).json(salas);

    res.status(200).json(salas);
  } catch (error) {
    existeError(res, error, 'alumnoSalasInscritasGet');
  }
};

const alumnoAceptarSalaPost = async (req, res = response) => {
  try {
    const aceptacion = await alumnosDB.postAlumnoAceptarSala(
      req.usuario.ID_USUARIO,
      req.params.sala
    );
    if (aceptacion.msg) return res.status(400).json(aceptacion);

    res.status(200).json(aceptacion);
  } catch (error) {
    existeError(res, error, 'alumnoAceptarSalaPost');
  }
};

const alumnoCancelarSalaDelete = async (req, res = response) => {
  try {
    const aceptacion = await alumnosDB.deleteAlumnoCancelarSala(
      req.usuario.ID_USUARIO,
      req.params.sala
    );
    if (aceptacion.msg) return res.status(400).json(aceptacion);

    res.status(200).json(aceptacion);
  } catch (error) {
    existeError(res, error, 'alumnoCancelarSalaDelete');
  }
};

const alumnoEliminarInscritoSalaDelete = async (req, res = response) => {
  try {
    const salirSala = await alumnosDB.delteAlumnoEliminarInscritoSala(
      req.body,
      req.usuario.ID_USUARIO
    );

    if (salirSala.msg) return res.status(400).json(salirSala);
    res.status(200).json(salirSala);
  } catch (error) {
    existeError(res, error, 'alumnoEliminarInscritoSalaDelete');
  }
};

module.exports = {
  alumnoGet,
  alumnosGet,
  alumnosNombreGet,
  alumnoSalasInscritasGet,
  alumnoAceptarSalaPost,
  alumnoCancelarSalaDelete,
  alumnoEliminarInscritoSalaDelete,
};
