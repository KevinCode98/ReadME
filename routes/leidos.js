const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { leidosGet, leidosPost } = require('../controllers/leidos');
const {
  existeAlumno,
  existeUsuario,
  existeLectura,
} = require('../middlewares/validar-existe');

const router = Router();

router.get('/:id', [validarJWT, existeUsuario], leidosGet);

module.exports = router;
