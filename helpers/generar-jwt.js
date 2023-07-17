const jwt = require('jsonwebtoken');

const generarJWT = (id_usuario) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id_usuario,
    };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se genero el token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
