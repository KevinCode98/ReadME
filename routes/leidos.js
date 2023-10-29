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
router.post(
  '/',
  [
    validarJWT,
    existeAlumno,
    check('id_lectura', 'El id_lectura es obligatorio').not().isEmpty(),
    validarCampos,
    existeLectura,
  ],
  leidosPost
);

module.exports = router;
