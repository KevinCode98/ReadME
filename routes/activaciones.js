const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  validarActivacionPost,
  actualizarActivacionPost,
} = require('../controllers/activaciones');
const { existeUsuario } = require('../middlewares/validar-existe');

const router = Router();

router.post(
  '/',
  [
    validarJWT,
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  validarActivacionPost
);

router.post('/generar', [validarJWT, existeUsuario], actualizarActivacionPost);

module.exports = router;
