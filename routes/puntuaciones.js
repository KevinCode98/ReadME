const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  existeUsuario,
  existePuntuacion,
  existeLectura,
} = require('../middlewares/validar-existe');
const {
  puntuacionesGet,
  puntuacionesPost,
  puntuacionesMisLecturasGet,
} = require('../controllers/puntuaciones.js');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get(
  '/mis-puntuaciones',
  [validarJWT, existeUsuario],
  puntuacionesMisLecturasGet
);
router.post(
  '/',
  [
    validarJWT,
    existeUsuario,
    check('id_lectura', 'El id_lectura es obligatorio').not().isEmpty(),
    check('puntuacion', 'El puntuacion es obligatorio').not().isEmpty(),
    validarCampos,
    existeLectura,
  ],
  puntuacionesPost
);
router.get(
  '/:id',
  [validarJWT, existeUsuario, existePuntuacion],
  puntuacionesGet
);

module.exports = router;
