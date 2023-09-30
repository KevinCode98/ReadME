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
} = require('../controllers/autores');
const {
  existeAutor,
  existeProfesor,
  existeNacionalidad,
} = require('../middlewares/validar-existe');

const router = Router();

router.get('/', autoresGet);
router.get('/:id', [existeAutor], autorGet);
router.get('/buscador/nombre/', autoresNombreGet);
router.post(
  '/',
  [
    validarJWT,
    existeProfesor,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos,
    existeNacionalidad,
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

module.exports = router;
