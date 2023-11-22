const { check } = require('express-validator');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  autorActualizarPost,
  autoresGet,
  autoresNombreGet,
  autorGet,
  autorPost,
  autoresLeidosGet,
} = require('../controllers/autores');
const {
  existeAutor,
  existeProfesor,
  existeNacionalidad,
  existeUsuario,
} = require('../middlewares/validar-existe');

const router = Router();

router.get('/', [validarJWT, existeUsuario], autoresGet);
router.get('/buscador/nombre/', [validarJWT, existeUsuario], autoresNombreGet);
router.get('/mis-autores', [validarJWT, existeUsuario], autoresLeidosGet);
router.post(
  '/',
  [
    validarJWT,
    existeProfesor,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  autorPost
);
router.post(
  '/actualizar/:id',
  [
    validarJWT,
    existeProfesor,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos,
    existeAutor,
    existeNacionalidad,
  ],
  autorActualizarPost
);
router.get('/:id', [validarCampos, existeUsuario, existeAutor], autorGet);

module.exports = router;
