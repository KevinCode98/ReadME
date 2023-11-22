const { Router } = require('express');
const {
  corrientesGet,
  corrienteGet,
  corrienteLeidosGet,
} = require('../controllers/corrientes');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeUsuario } = require('../middlewares/validar-existe');

const router = Router();

router.get('/', [validarJWT, existeUsuario], corrientesGet);
router.get('/mis-corrientes', [validarJWT, existeUsuario], corrienteLeidosGet);
router.get('/:id', [validarJWT, existeUsuario], corrienteGet);

module.exports = router;
