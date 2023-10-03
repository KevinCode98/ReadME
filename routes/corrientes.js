const { Router } = require('express');
const { corrientesGet, corrienteGet } = require('../controllers/corrientes');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeUsuario } = require('../middlewares/validar-existe');

const router = Router();

router.get('/', [validarJWT, existeUsuario], corrientesGet);
router.get('/:id', [validarJWT, existeUsuario], corrienteGet);

module.exports = router;
