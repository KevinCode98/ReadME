const { response } = require('express');
const { existeError } = require('../helpers/validator');
const lecturaDB = require('../querys/lecturas');
const historialDB = require('../querys/historial');
const puntuacionesDB = require('../querys/puntuaciones');
const leidosDB = require('../querys/leidos');
const historialController = require('./historial');
const progresosController = require('./progresos');
const leidosController = require('./leidos');
const { subirArchivo, eliminarArchivo } = require('../helpers/subir-archivo');
const {
  subirArchivoPdf,
  eliminarArchivoPdf,
} = require('../helpers/notificaciones');
const {
  obtenerCaracteresPorDispositivo,
} = require('../helpers/caracteres-dispositivos');

const lecturasGet = async (req, res = responese) => {
  try {
    res.json(await lecturaDB.getLecturas());
  } catch (error) {
    existeError(res, error, 'lecturasGet');
  }
};

const lecturaGet = async (req, res = responese) => {
  try {
    const id_alumno = req.usuario.ID_USUARIO;
    const lectura = await lecturaDB.getLectura(req.params.id, false, id_alumno);

    let arregloUsuarios = await historialDB.getHistorialArregloUsuariosLecura(
      req.params.id
    );

    const usuariosLeidos = await leidosDB.getLeidoUsuariosPorLectura(
      req.params.id
    );

    usuariosLeidos.forEach((usuario) => {
      if (!arregloUsuarios.includes(usuario)) arregloUsuarios.push(usuario);
    });

    lectura.total = usuariosLeidos.length;
    res.status(200).json(lectura);
  } catch (error) {
    existeError(res, error, 'lecturaGet');
  }
};

const lecturasMasPuntuadasGet = async (req, res = response) => {
  // TODO: Terminar
  const mapLecturas = new Map();
  const lecturas = await lecturaDB.getLecturas();

  for (const lectura of lecturas) {
    mapLecturas.set(
      await lecturaDB.getLecturaInfo(lectura.ID_LECTURA),
      await puntuacionesDB.getCantidadPuntuaciones(lectura.ID_LECTURA)
    );
  }

  const auxMap = Array.from(mapLecturas).sort((b, a) => a[1] - b[1]);

  res.json(auxMap);
};

const lecturaNombreGet = async (req, res = response) => {
  try {
    if (Object.keys(req.query).length == 0)
      return res.json(await lecturaDB.getLecturas());
    else if (
      req.query.nombre !== undefined &&
      Object.keys(req.query).length == 1
    )
      return res.json(await lecturaDB.getNombreLecturas(req.query.nombre));
    else return res.json(await lecturaDB.getLecturaConFiltros(req.query));
  } catch (error) {
    existeError(res, error, 'lecturaNombreGet');
  }
};

const lecturasLeidasGet = async (req, res = responese) => {
  try {
    return res
      .status(200)
      .json(await lecturaDB.getLecturasLeidas(req.usuario.ID_USUARIO));
  } catch (error) {
    existeError(res, error, 'lecturasLeidasGet');
  }
};

const lecturaPost = async (req, res = response) => {
  try {
    if (
      !req.files ||
      Object.keys(req.files).length === 0 ||
      !req.files.archivo
    ) {
      return res.status(400).json({ msg: 'No hay archivos en la petición' });
    }
    const pathCompleto = await subirArchivo(req.files, ['pdf'], 'lecturas');
    const splitPath = pathCompleto.split('/');
    const uuidLectura = splitPath[splitPath.length - 1].split('.')[0];

    const urlDownload = await subirArchivoPdf(pathCompleto, uuidLectura);

    const response = await fetch(process.env.PATH_OCR + uuidLectura, {
      method: 'POST',
      body: JSON.stringify({
        URL: urlDownload,
      }),
    });

    response.text().then(async (text) => {
      await eliminarArchivoPdf(uuidLectura);
      eliminarArchivo(uuidLectura, 'lecturas');
      if (!text) return res.status(400).json('Error de extraccion de texto');
      else {
        res.json(await lecturaDB.postLectura(req.body, text));
      }
    });
  } catch (error) {
    existeError(res, error, 'lecturaPost');
  }
};

const lecturasTextoGet = async (req, res = response) => {
  const id_alumno = req.usuario.ID_USUARIO;
  const lectura = await lecturaDB.getLectura(req.params.id, true, id_alumno);

  if (!lectura)
    return res.status(400).json({ msg: 'No existe la lectura especificada.' });

  if (!lectura.TEXTO)
    return res.status(400).json({ msg: 'La lectura no tiene texto.' });

  const anchoDispositivo = req.query.ancho;
  const altoDispositivo = req.query.alto;
  const escalaDispositivo = req.query.escala;

  let pages = [];
  const texto = lectura.TEXTO.replace(/\n\n/gi, '\n').split(' ');
  const longitud = texto.length;
  let step = obtenerCaracteresPorDispositivo(
    altoDispositivo,
    anchoDispositivo,
    escalaDispositivo
  );

  if (longitud <= step) {
    pages.push({
      text: lectura.TEXTO,
    });
  } else {
    let cortar = true;
    while (cortar) {
      const textAux = texto.splice(0, step);
      pages.push({
        text: textAux.join(' '),
      });
      if (texto.length <= step) {
        cortar = false;
        pages.push({
          text: texto.join(' '),
        });
      }
    }
  }
  res.json(pages);
};

const lecturaSalirPost = async (req, res = response) => {
  try {
    const id_alumno = req.usuario.ID_USUARIO;
    let leidos = {};
    req.body.avance = 100;

    const { ancho, alto, escala, id_lectura, pagina } = req.body;

    if (!req.body.termino) {
      const caracteresPorPagina = obtenerCaracteresPorDispositivo(
        alto,
        ancho,
        escala
      );
      const lectura = await lecturaDB.getLectura(id_lectura, true, id_alumno);
      const texto = lectura.TEXTO.replace(/\n\n/gi, '\n').split(' ');
      const longitud = texto.length;
      const avanceReal = (
        (parseInt(
          caracteresPorPagina * (pagina - 1) + caracteresPorPagina / 2
        ) *
          100) /
        longitud
      ).toFixed(2);
      req.body.avance = Number(avanceReal);
    }

    const historial = await historialController.historialPost(
      req.body,
      id_alumno
    );
    const progreso = await progresosController.progresosPost(
      req.body,
      id_alumno
    );

    if (req.body.termino) {
      leidos = await leidosController.leidosPost(
        req.body.id_lectura,
        id_alumno,
        historial.ID_HISTORIAL
      );

      await historialController.historialDelete(historial.ID_HISTORIAL);
    }

    res.json({ historial, progreso, leidos });
  } catch (error) {
    existeError(res, error, 'lecturaSalirPost');
  }
};

module.exports = {
  lecturaGet,
  lecturaNombreGet,
  lecturaPost,
  lecturaSalirPost,
  lecturasGet,
  lecturasLeidasGet,
  lecturasMasPuntuadasGet,
  lecturasTextoGet,
};
