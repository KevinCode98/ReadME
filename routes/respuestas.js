const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  respuestaGet,
  respuestaPost,
  respuestasDeQuestionarioGet,
  respuestasPuntosGet,
  respuestasPuntosAlumnosQuestionarioGet,
} = require('../controllers/respuestas');
const {
  existeAlumno,
  existePregunta,
  existeOpcion,
  existeRespuesta,
  existeQuestionario,
  existeProfesor,
  existeUsuario,
} = require('../middlewares/validar-existe');

const router = Router();

router.get(
  '/',
  [
    validarJWT,
    existeUsuario,
    check('id_questionario', 'El id_questionario es obligatorio')
      .not()
      .isEmpty(),
    check('id_alumno', 'El id_alumno es obligatorio').not().isEmpty(),
    validarCampos,
    existeQuestionario,
  ],
  respuestasDeQuestionarioGet
);
router.get(
  '/total-puntos',
  [
    validarJWT,
    existeUsuario,
    check('id_questionario', 'El id_questionario es obligatorio')
      .not()
      .isEmpty(),
    check('id_alumno', 'El id_alumno es obligatorio').not().isEmpty(),
    validarCampos,
    existeQuestionario,
    existeAlumno,
  ],
  respuestasPuntosGet
);

router.get(
  '/total-puntos-questionario',
  [
    validarJWT,
    existeUsuario,
    check('id_questionario', 'El id_questionario es obligatorio')
      .not()
      .isEmpty(),
    validarCampos,
    existeQuestionario,
  ],
  respuestasPuntosAlumnosQuestionarioGet
);
router.post(
  '/',
  [
    validarJWT,
    existeAlumno,
    check('id_pregunta', 'El id_pregunta es obligatorio').not().isEmpty(),
    check('id_opcion', 'El id_opcion es obligatorio').not().isEmpty(),
    check('tiempo', 'El tiempo es obligatorio').not().isEmpty(),
    validarCampos,
    existePregunta,
    existeOpcion,
  ],
  respuestaPost
);
router.get('/:id', [validarJWT, existeUsuario, existeRespuesta], respuestaGet);

module.exports = router;
