const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  preguntaGet,
  preguntaPost,
  preguntaConOpcionesGet,
  preguntaDelete,
} = require('../controllers/preguntas');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  existeUsuario,
  existePregunta,
  existeProfesor,
} = require('../middlewares/validar-existe');

const router = Router();

router.get(
  '/',
  [
    validarJWT,
    existeUsuario,
    check('id_pregunta', 'El id_pregunta es obligatorio').not().isEmpty(),
    validarCampos,
    existePregunta,
  ],
  preguntaConOpcionesGet
);
router.post(
  '/',
  [
    check('id_questionario', 'El id_questionario es obligatorio')
      .not()
      .isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('cerrada', 'El campo cerrada es obligatoria').isBoolean(),
    validarCampos,
  ],
  preguntaPost
);
router.delete(
  '/:id',
  [validarJWT, existeProfesor, existePregunta],
  preguntaDelete
);
router.get('/:id', [validarJWT, existeUsuario, existePregunta], preguntaGet);

module.exports = router;
