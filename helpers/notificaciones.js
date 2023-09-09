const admin = require('firebase-admin');

const serviceAccount = require('../key/readme-54870-firebase-adminsdk-2nn8t-ef829c3eb5.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendPushToOneUser = (notificaionSala) => {
  const message = {
    token: notificaionSala.tokenId,
    data: {},
    notification: {
      title: notificaionSala.titulo,
      body: notificaionSala.mensaje,
    },
  };
  sendMessage(message);
};

const sendPushToTopic = (notificacion) => {
  const message = {
    topic: notificacion.topic,
    data: {
      titulo: notificacion.titulo,
      mensaje: notificacion.mensaje,
    },
  };
  sendMessage(message);
};

const sendMessage = (message) => {
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log(`Mensaje enviado correctamente: ${response}`);
    })
    .catch((error) => {
      console.log(`Error al enviar el mensaje ${error}`);
    });
};

module.exports = {
  sendPushToTopic,
  sendPushToOneUser,
};
