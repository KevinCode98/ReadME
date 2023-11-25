const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (
  files,
  extensionesValidas,
  carpeta,
  fotografia = false
) => {
  return new Promise((resolve, reject) => {
    if (!files && fotografia) {
      return resolve(path.join(__dirname, '../public/imagenes/no-image.jpeg'));
    } else {
      const { archivo } = files;
      const nombreCortado = archivo.name.split('.');
      const extension = nombreCortado[nombreCortado.length - 1];

      // validar la extension
      if (!extensionesValidas.includes(extension)) {
        return reject(
          `La extensión ${extension} no es permitida - ${extensionesValidas}`
        );
      }
      const nombreTemporal = uuidv4() + '.' + extension;
      let subidaPath = '';

      if (!fotografia)
        subidaPath = path.join(
          __dirname,
          '../archivos/',
          carpeta,
          nombreTemporal
        );
      else
        subidaPath = path.join(
          __dirname,
          '../public/imagenes/',
          nombreTemporal
        );

      archivo.mv(subidaPath, (err) => {
        if (err) return reject(err);

        resolve(subidaPath);
      });
    }
  });
};

const eliminarArchivo = (
  uuid_file,
  carpeta,
  extension = 'pdf',
  fotografia = false
) => {
  let pathArchivo = '';

  if (!fotografia)
    pathArchivo = path.join(__dirname, '../archivos/', carpeta, uuid_file);
  else pathArchivo = path.join(__dirname, '../public/imagenes/', uuid_file);

  fs.unlink(`${pathArchivo}.${extension}`, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

module.exports = {
  subirArchivo,
  eliminarArchivo,
};
