const { response } = require('express');
const lecturaDB = require('../querys/lecturas');
const historialDB = require('../querys/historial');
const puntuacionesDB = require('../querys/puntuaciones');
const leidosDB = require('../querys/leidos');
const historialController = require('./historial');
const progresosController = require('./progresos');
const leidosController = require('./leidos');
const { subirArchivo } = require('../helpers/subir-archivo');
const {
  subirArchivoPdf,
  eliminarArchivoPdf,
} = require('../helpers/notificaciones');

const lecturasGet = async (req, res = responese) => {
  try {
    res.json(await lecturaDB.getLecturas());
  } catch (error) {
    console.error('Error en la petición de base de datos - lecturasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturasGet',
    });
  }
};

const lecturaGet = async (req, res = responese) => {
  try {
    const lectura = await lecturaDB.getLectura(req.params.id);

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
    console.error('Error en la petición de base de datos - lecturasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturasGet',
    });
  }
};

const lecturasMasPuntuadasGet = async (req, res = response) => {
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
    if (Object.keys(req.query.nombre).length == 0)
      return res.json(await lecturaDB.getLecturas());
    else return res.json(await lecturaDB.getNombreLecturas(req.query.nombre));
  } catch (error) {
    console.error('Error en la petición de base de datos - lecturaNombreGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturaNombreGet',
    });
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
      if (!text) return res.status(400).json('Error de extraccion de texto');
      else {
        res.json(await lecturaDB.postLectura(req.body, text));
      }
    });
  } catch (error) {
    console.log(error);
    console.error('Error en la petición de base de datos - lecturaPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturaPost',
    });
  }
};

const lecturasTextoGet = async (req, res = response) => {
  const lectura = await lecturaDB.getLectura(req.params.id, true);

  if (!lectura)
    return res.status(400).json({ msg: 'No existe la lectura especificada.' });

  if (!lectura.TEXTO)
    return res.status(400).json({ msg: 'La lectura no tiene texto.' });

  const anchoDispositivo = req.query.ancho;
  const altoDispositivo = req.query.alto;

  const areaDispositivo = parseInt(anchoDispositivo * altoDispositivo);

  const modeloArea = 341824;
  const caracteresArea = 135;

  const caracteresDispositivo = parseInt(
    (areaDispositivo * caracteresArea) / modeloArea
  );
  console.log('caracteres ', caracteresDispositivo);
  let pages = [];
  const texto = lectura.TEXTO.replace(/\n\n/gi, '\n').split(' ');
  const longitud = texto.length;
  let step = caracteresDispositivo;
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

    if (!req.body.termino) {
      req.body.avance = 65;
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
    console.log(error);
    console.error('Error en la petición de base de datos - lecturaPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturaPost',
    });
  }
};

module.exports = {
  lecturaGet,
  lecturaNombreGet,
  lecturaPost,
  lecturaSalirPost,
  lecturasGet,
  lecturasMasPuntuadasGet,
  lecturasTextoGet,
};
