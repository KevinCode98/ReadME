const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  validarActivacionPost,
  actualizarActivacionPost,
} = require('../controllers/activaciones');

const router = Router();

router.post(
  '/',
  [
    validarJWT,
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('tiempoCliente', 'El tiempoCliente es obligatorio').not().isEmpty(),
    check('tiempoCliente', 'La tiempoCliente no es válida')
      .isISO8601()
      .toDate(),
    validarCampos,
  ],
  validarActivacionPost
);

router.post(
  '/generar',
  [
    validarJWT,
    check('tiempoCliente', 'El tiempoCliente es obligatorio').not().isEmpty(),
    check('tiempoCliente', 'La tiempoCliente no es válida')
      .isISO8601()
      .toDate(),
    validarCampos,
  ],
  actualizarActivacionPost
);

module.exports = router;
