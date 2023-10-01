const { response, text } = require('express');
const lecturaDB = require('../querys/lecturas');
const { subirArchivo } = require('../helpers/subir-archivo');

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
  const id = req.params.id;

  try {
    res.json(await lecturaDB.getLectura(id));
  } catch (error) {
    console.error('Error en la petición de base de datos - lecturasGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturasGet',
    });
  }
};

const lecturaNombreGet = async (req, res = response) => {
  const nombre = req.query.nombre;

  try {
    if (Object.keys(nombre).length == 0)
      return res.json(await lecturaDB.getLecturas());
    else return res.json(await lecturaDB.getNombreLecturas(nombre));
  } catch (error) {
    console.error('Error en la petición de base de datos - lecturaNombreGet');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturaNombreGet',
    });
  }
};

const lecturaPost = async (req, res = response) => {
  try {
    // if (
    //   !req.files ||
    //   Object.keys(req.files).length === 0 ||
    //   !req.files.archivo
    // ) {
    //   return res.status(400).json({ msg: 'No hay archivos en la petición' });
    // }
    // const pathCompleto = await subirArchivo(req.files, ['pdf'], 'lecturas');
    // const splitPath = pathCompleto.split('/');
    // const uuidLectura = splitPath[splitPath.length - 1].split('.')[0];

    // const response = await fetch(
    //   'http://localhost:8000/converter/' + uuidLectura
    // );

    // response.text().then(async (text) => {
    //   if (!text) return res.status(400).json('Error de extraccion de texto');
    //   else {
    res.json(await lecturaDB.postLectura(req.body, 'None'));
    // }
    // });
  } catch (error) {
    console.error('Error en la petición de base de datos - lecturaPost');
    return res.status(500).json({
      msg: 'Hable con el administrador - lecturaPost',
    });
  }
};

const lecturasTextoGet = async (req, res = response) => {
  const id = req.params.id;
  const lectura = await lecturaDB.getLectura(id,true);

  if(!lectura) return res.status(400).json({ msg: 'No existe la lectura especificada.' }); 

  if(!lectura.TEXTO) return res.status(400).json({ msg: 'La lectura no tiene texto.' });

  let pages = [];
  const texto = lectura.TEXTO.replace(/\n\n/gi,"\n").split(" ")
  const longitud = texto.length;
  let step = 110;
  if(longitud <= step){
    pages.push({
      text : lectura.TEXTO
    });
  }else{
    let cortar = true;
    while(cortar){
      const textAux = texto.splice(0,step);
      pages.push({
        text : textAux.join(" ")
      });
      if(texto.length <= step){
        cortar = false;
        pages.push({
          text : texto.join(" ")
        });
      }
    }
  }
  res.json(pages);
}

module.exports = {
  lecturaGet,
  lecturasGet,
  lecturaNombreGet,
  lecturaPost,
  lecturasTextoGet
};
