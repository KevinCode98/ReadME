const { response } = require('express');
const alumnosDB = require('../querys/alumnos');

const alumnosGet = async (req, res = response) => {
  try {
    res.status(200).json(await alumnosDB.getAlumnos());
  } catch (error) {
    console.error('Error en la petición de base de datos - alumnosGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnosGet',
    });
  }
};

const alumnosNombreGet = async (req, res = response) => {
  try {
    if (Object.keys(req.query.nombre).length == 0)
      res.json(await alumnosDB.getAlumnos());
    else res.json(await alumnosDB.getNombresAlumnos(req.query.nombre));
  } catch (error) {
    console.error('Error en la petición de base de datos - alumnosNombreGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnosNombreGet',
    });
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
    console.error('Error enl a petición de la base de datos - alumnoGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnoGet',
    });
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
    console.error(
      'Error enl a petición de la base de datos - alumnoSalasInscritasGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnoSalasInscritasGet',
    });
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
    console.error(
      'Error en la petición de base de datos - alumnoAceptarSalaPost'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnoAceptarSalaPost',
    });
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
    console.error(
      'Error en la petición de base de datos - alumnoCancelarSalaDelete'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnoCancelarSalaDelete',
    });
  }
};

module.exports = {
  alumnoGet,
  alumnosGet,
  alumnosNombreGet,
  alumnoSalasInscritasGet,
  alumnoAceptarSalaPost,
  alumnoCancelarSalaDelete,
};
