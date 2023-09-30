const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  respuestaGet,
  respuestaPost,
  respuestasDeQuestionarioGet,
} = require('../controllers/respuestas');
const {
  existeAlumno,
  existePregunta,
  existeOpcion,
  existeRespuesta,
  existeQuestionario,
  existeProfesor,
} = require('../middlewares/validar-existe');

const router = Router();

router.get(
  '/',
  [
    validarJWT,
    existeProfesor,
    check('id_questionario', 'El id_questionario es obligatorio')
      .not()
      .isEmpty(),
    check('id_alumno', 'El id_alumno es obligatorio').not().isEmpty(),
    validarCampos,
    existeQuestionario,
  ],
  respuestasDeQuestionarioGet
);
router.get('/:id', [existeRespuesta], respuestaGet);
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

module.exports = router;
