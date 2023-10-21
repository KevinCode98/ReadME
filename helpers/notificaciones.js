const admin = require('firebase-admin');
const { readFileSync } = require('node:fs');
const { initializeApp } = require('@firebase/app');
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  cert,
} = require('@firebase/storage');
const serviceAccount = require('../key/readme-54870-firebase-adminsdk-2nn8t-ef829c3eb5.json');

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'readme-54870.appspot.com',
});

initializeApp(firebaseConfig);
const storage = getStorage();

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

const subirArchivoPdf = async (pathCompleto, uuid) => {
  const nombreCortado = pathCompleto.split('.');
  const extension = nombreCortado[nombreCortado.length - 1];

  // validar la extension
  if (extension !== 'pdf') {
    return { msg: `La extensión ${extension} no es permitida` };
  }

  // Subir archivo
  const storageRef = ref(storage, `lecturas/${uuid}.pdf`);

  // Create file metadata including the content type
  const metadata = { contentType: 'application/pdf' };

  // Upload the file in the bucket storage
  const snapshot = await uploadBytesResumable(
    storageRef,
    readFileSync(pathCompleto),
    metadata
  );
  //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

  // Grab the public url
  return await getDownloadURL(snapshot.ref);
};

const eliminarArchivoPdf = async (uuid) => {
  await admin.storage().bucket().file(`lecturas/${uuid}.pdf`).delete();
};

module.exports = {
  sendPushToTopic,
  sendPushToOneUser,
  subirArchivoPdf,
  eliminarArchivoPdf,
};
