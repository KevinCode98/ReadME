const { response, request } = require('express');
const alumnosDB = require('../querys/alumnos');
const activacionDB = require('../querys/activaciones');

const alumnosGet = async (req, res = response) => {
  try {
    res.json(await alumnosDB.getAlumnos());
  } catch (error) {
    console.error('Error en la petición de base de datos - alumnosGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnosGet',
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

const alumnoPost = async (req, res = response) => {
  try {
    const alumno = await alumnosDB.postAlumno(req.body);
    if (alumno.alumnoDB)
      await activacionDB.postActualizarCodigo(alumno.alumnoDB.ID_USUARIO);

    res.json(alumno);
  } catch (error) {
    console.error('Error en la petición de la base de datos - alumnoPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnoPost',
    });
  }
};

const alumnoDelete = async (req, res = response) => {
  const id = req.params.id;

  try {
    const alumnoAutenticado = req.usuario;
    if (Number(id) !== Number(alumnoAutenticado.ID_USUARIO)) {
      return res.status(401).json({
        msg: `El ID ${alumnoAutenticado.ID_USUARIO} no es el propietario de la cuenta`,
      });
    }

    res.json(await alumnosDB.deleteAlumno(id));
  } catch (error) {
    console.error('Error enl a petición de la base de datos - alumnoDelete');
    return res.status(500).json({
      msg: 'Hable con el administrador - alumnoDelete',
    });
  }
};

module.exports = {
  alumnosGet,
  alumnoGet,
  alumnoPost,
  alumnoDelete,
};
