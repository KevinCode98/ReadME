const { response } = require('express');
const { existeError } = require('../helpers/validator');
const autoresDB = require('../querys/autores');
const leidosDB = require('../querys/leidos');

const autoresGet = async (req, res = response) => {
  try {
    res.json(await autoresDB.getAutores());
  } catch (error) {
    existeError(res, error, 'autoresGet');
  }
};

const autoresNombreGet = async (req, res = response) => {
  try {
    if (Object.keys(req.query.nombre).length == 0)
      res.json(await autoresDB.getAutores());
    else res.json(await autoresDB.getNombresAutores(req.query.nombre));
  } catch (error) {
    existeError(res, error, 'autoresNombreGet');
  }
};

const autorGet = async (req, res = response) => {
  try {
    res.json(await autoresDB.getAutor(req.params.id));
  } catch (error) {
    existeError(res, error, 'autorGet');
  }
};

const autoresLeidosGet = async (req, res = response) => {
  try {
    const histoial = await leidosDB.getLeidosPorUsuario(req.body.id_alumno);

    const autores = {};
    const mapAutores = new Map();
    for (const autorHistorial of histoial) {
      const autorAux = await autoresDB.getAutor(
        autorHistorial.LECTURAS.AUTORES.ID_AUTOR
      );

      if (mapAutores.has(autorAux.ID_AUTOR)) {
        mapAutores.set(
          autorAux.ID_AUTOR,
          mapAutores.get(autorAux.ID_AUTOR) + 1
        );
      } else {
        mapAutores.set(autorAux.ID_AUTOR, 1);
      }
    }

    const auxMap = Array.from(mapAutores).sort((b, a) => a[1] - b[1]);
    const libros = [];
    for (const lectura of auxMap) {
      const autor = await autoresDB.getAutor(lectura[0]);
      const objAux = {
        DESCRIPCION: `${autor.NOMBRE} ${autor.APELLIDOS}`,
        LECTURAS: lectura[1],
      };
      libros.push(objAux);
    }

    res.status(200).json(libros);
  } catch (error) {
    existeError(res, error, 'autoresLeidosGet');
  }
};

const autorPost = async (req, res = response) => {
  try {
    res.status(200).json(await autoresDB.postAutor(req.body));
  } catch (error) {
    existeError(res, error, 'autorPost');
  }
};

const autorActualizarPost = async (req, res = response) => {
  try {
    res
      .status(200)
      .json(await autoresDB.postActualizarAutor(req.body, req.params.id));
  } catch (error) {
    existeError(res, error, 'autorActualizarPost');
  }
};

module.exports = {
  autoresLeidosGet,
  autorActualizarPost,
  autoresGet,
  autoresNombreGet,
  autorGet,
  autorPost,
};
