const { check } = require('express-validator');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  inscritosGet,
  inscritosPost,
  inscritosHashPost,
} = require('../controllers/inscritos');
const {
  existeProfesor,
  existeSala,
  existeUsuario,
  existeAlumno,
} = require('../middlewares/validar-existe');

const router = Router();

router.post(
  '/',
  [
    validarJWT,
    existeProfesor,
    check('id_sala', 'El id_sala es obligatorio').not().isEmpty(),
    check('id_alumno', 'El id_alumno es obligatorio').not().isEmpty(),
    existeSala,
    validarCampos,
  ],
  inscritosPost
);
router.post(
  '/hash',
  [
    validarJWT,
    existeAlumno,
    check('hash', 'El hash es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  inscritosHashPost
);
router.get('/:id', [validarJWT, existeUsuario], inscritosGet);

module.exports = router;
