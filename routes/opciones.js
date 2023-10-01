const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { opcionGet, opcionPost } = require('../controllers/opciones');
const {
  existeProfesor,
  existePregunta,
  existeUsuario,
  existeOpcion,
} = require('../middlewares/validar-existe');

const router = Router();

router.get(
  '/:id',
  [validarJWT, existeUsuario, existeOpcion, existePregunta],
  opcionGet
);
router.post(
  '/',
  [
    validarJWT,
    existeProfesor,
    check('id_pregunta', 'El id_pregunta es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('correcta', 'Correcta es obligatorio').isBoolean(),
    existePregunta,
    validarCampos,
  ],
  opcionPost
);

module.exports = router;
