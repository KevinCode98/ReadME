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
  const nombre = req.query.nombre;

  try {
    if (Object.keys(nombre).length == 0) res.json(await alumnosDB.getAlumnos());
    else res.json(await alumnosDB.getNombresAlumnos(nombre));
  } catch (error) {
    console.error('Error en la petición de base de datos - alumnosNombreGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnosNombreGet',
    });
  }
};

const alumnoGet = async (req, res = response) => {
  const id = req.params.id;

  try {
    res.json(await alumnosDB.getAlumno(id));
  } catch (error) {
    console.error('Error enl a petición de la base de datos - alumnoGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnoGet',
    });
  }
};

const alumnoSalasInscritasGet = async (req, res = response) => {
  const id = req.usuario.ID_USUARIO;

  try {
    const salas = await alumnosDB.getAlumnoSalasInscritas(id);
    if (salas.msg) return res.status(400).json(salas);

    res.status(200).json(salas);
  } catch (error) {
    console.log(error);
    console.error(
      'Error enl a petición de la base de datos - alumnoSalasInscritasGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnoSalasInscritasGet',
    });
  }
};

const alumnoAceptarSalaPost = async (req, res = response) => {
  const id = req.usuario.ID_USUARIO;
  const sala = req.params.sala;

  try {
    const aceptacion = await alumnosDB.postAlumnoAceptarSala(id, sala);
    if (aceptacion.msg) return res.status(400).json(aceptacion);

    res.status(200).json(aceptacion);
  } catch (error) {
    console.log(error);
    console.error(
      'Error en la petición de base de datos - alumnoAceptarSalaPost'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnoAceptarSalaPost',
    });
  }
};

const alumnoCancelarSalaDelete = async (req, res = response) => {
  const id = req.usuario.ID_USUARIO;
  const sala = req.params.sala;

  try {
    const aceptacion = await alumnosDB.deleteAlumnoCancelarSala(id, sala);
    if (aceptacion.msg) return res.status(400).json(aceptacion);

    res.status(200).json(aceptacion);
  } catch (error) {
    console.log(error);
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
