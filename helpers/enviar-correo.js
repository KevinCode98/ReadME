const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_GMAIL,
    pass: process.env.PSW_GMAIL,
  },
});

const enviarCorreo = (datos) => {
  transporter.sendMail(datos, (err, info) => {
    if (err) console.log(err);
    else console.log(`Correo enviado a ${info.response}`);
  });
};

module.exports = {
  enviarCorreo,
};
