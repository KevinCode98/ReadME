const { response, request } = require('express');
const salasDB = require('../querys/salas');

const salasGet = async (req, res = response) => {
  try {
    res.json(await salasDB.getSalas());
  } catch (error) {
    console.error('Error en la petición de base de datos - salasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - salasGet',
    });
  }
};

const salaGet = async (req, res = response) => {
  const hash = req.params.hash;

  try {
    const sala = await salasDB.getSala(hash);

    if (sala === null)
      return res.status(400).json({
        msg: `No se encontro una sala con el hash: ${hash}`,
      });

    res.status(200).json(sala);
  } catch (error) {
    console.error('Error en la petición de base de datos - salaGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - salaGet',
    });
  }
};

const salasPost = async (req, res = response) => {
  const id = req.usuario.ID_USUARIO;

  try {
    const sala = await salasDB.postSalas(id, req.body);

    if (sala.msg) return res.status(400).json(sala);
    res.status(200).json(sala);
  } catch (error) {
    console.error('Error en la petición de base de datos - salasPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - salasPost',
    });
  }
};

// TODO: Aceptar una invitacion de una sala
const alumnoAceptarSalaPost = async (req, res = response) => {
  const id = req.usuario.ID_USUARIO;
  const sala = req.params.sala;
  const inscripcion = req.params.inscripcion;

  try {
    const aceptacion = await salasDB.postAlumnoAceptarSala(
      id,
      sala,
      inscripcion
    );
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

module.exports = {
  salaGet,
  salasGet,
  salasPost,
  alumnoAceptarSalaPost,
};
