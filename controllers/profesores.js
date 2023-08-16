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

const profesoresNombreGet = async (req, res = response) => {
  const nombre = req.query.nombre;

  try {
    if (Object.keys(nombre).length == 0)
      res.json(await profesoresDB.getProfesores());
    else res.json(await profesoresDB.getNombresProfesores(nombre));
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

// TODO: Retornar las salas que las ha asignado el Profesor
const profesorSalasGet = async (req, res = response) => {
  const id = req.usuario.ID_USUARIO;

  try {
    res.json(await profesoresDB.getProfesorSalas(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - profesorSalasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - profesorSalasGet',
    });
  }
};

// TODO:: Retornar todos los Alumnos que se encuentran en una sala
const profesorSalaInscritosGet = async (req, res = response) => {
  const id = req.usuario.ID_USUARIO;
  const sala = req.params.sala;

  try {
    const alumnos = await profesoresDB.getProfesorSalaInscritos(id, sala);
    if (alumnos.msg) return res.status(400).json(alumnos);

    res.status(200).json(alumnos);
  } catch (error) {
    console.log(error);
    console.error(
      'Error en la petición de base de datos - profesorSalaInscritosGet'
    );
    return res.status(500).json({
      msg: 'Hable con el administrador - profesorSalaInscritosGet',
    });
  }
};

module.exports = {
  profesoresGet,
  profesoresNombreGet,
  profesorGet,
  profesorSalasGet,
  profesorSalaInscritosGet,
};
