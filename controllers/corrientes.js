const { response } = require('express');
const { existeError } = require('../helpers/validator');
const corrientesDB = require('../querys/corrientes');
const leidosDB = require('../querys/leidos');

const corrientesGet = async (req, res = response) => {
  try {
    res.status(200).json(await corrientesDB.getCorrientes());
  } catch (error) {
    existeError(res, error, 'corrientesGet');
  }
};

const corrienteLeidosGet = async (req, res = response) => {
  try {
    const histoial = await leidosDB.getLeidosPorUsuario(req.query.id_alumno);

    const corrientes = {};
    const mapCorrientes = new Map();
    for (const corrienteHistorial of histoial) {
      const corrienteAux = await corrientesDB.getCorriente(
        corrienteHistorial.LECTURAS.CORRIENTES.ID_CORRIENTE
      );

      if (mapCorrientes.has(corrienteAux.ID_CORRIENTE)) {
        mapCorrientes.set(
          corrienteAux.ID_CORRIENTE,
          mapCorrientes.get(corrienteAux.ID_CORRIENTE) + 1
        );
      } else {
        mapCorrientes.set(corrienteAux.ID_CORRIENTE, 1);
      }
    }

    const auxMap = Array.from(mapCorrientes).sort((b, a) => a[1] - b[1]);
    const libros = [];
    for (const lectura of auxMap) {
      const corriente = await corrientesDB.getCorriente(lectura[0]);
      const objAux = {
        DESCRIPCION: corriente.NOMBRE,
        LECTURAS: lectura[1],
      };
      libros.push(objAux);
    }
    res.status(200).json(libros);
  } catch (error) {
    existeError(res, error, 'corrienteLeidosGet');
  }
};

const corrienteGet = async (req, res = response) => {
  try {
    res.status(200).json(await corrientesDB.getCorriente(req.params.id));
  } catch (error) {
    existeError(res, error, 'corrienteGet');
  }
};

module.exports = {
  corrienteGet,
  corrienteLeidosGet,
  corrientesGet,
};
