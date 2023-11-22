const { response } = require('express');
const { existeError } = require('../helpers/validator');
const tematicasDB = require('../querys/tematicas');
const leidosDB = require('../querys/leidos');

const tematicasGet = async (req, res = response) => {
  try {
    res.status(200).json(await tematicasDB.getTematicas());
  } catch (error) {
    existeError(res, error, 'tematicasGet');
  }
};

const tematicasLeidosGet = async (req, res = response) => {
  try {
    const histoial = await leidosDB.getLeidosPorUsuario(req.body.id_alumno);

    const tematicas = {};
    const mapTematicas = new Map();
    for (const tematicaHistorial of histoial) {
      const tematicaAux = await tematicasDB.getTematica(
        tematicaHistorial.LECTURAS.TEMATICAS.ID_TEMATICA
      );

      if (mapTematicas.has(tematicaAux.ID_TEMATICA)) {
        mapTematicas.set(
          tematicaAux.ID_TEMATICA,
          mapTematicas.get(tematicaAux.ID_TEMATICA) + 1
        );
      } else {
        mapTematicas.set(tematicaAux.ID_TEMATICA, 1);
      }
    }

    const auxMap = Array.from(mapTematicas).sort((b, a) => a[1] - b[1]);

    const libros = [];
    for (const lectura of auxMap) {
      const tematica = await tematicasDB.getTematica(lectura[0]);
      const objAux = {
        DESCRIPCION: tematica.NOMBRE,
        LECTURAS: lectura[1],
      };
      libros.push(objAux);
    }
    res.status(200).json(libros);
  } catch (error) {
    existeError(res, error, 'tematicasLeidosGet');
  }
};

const tematicaGet = async (req, res = response) => {
  try {
    res.status(200).json(await tematicasDB.getTematica(req.params.id));
  } catch (error) {
    existeError(res, error, 'tematicaGet');
  }
};

module.exports = {
  tematicasGet,
  tematicasLeidosGet,
  tematicaGet,
};
