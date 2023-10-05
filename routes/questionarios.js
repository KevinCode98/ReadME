const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  existeProfesor,
  existeAsignacion,
  existeUsuario,
  existeQuestionario,
  existeAlumno,
} = require('../middlewares/validar-existe');
const {
  questionarioGet,
  questionarioPost,
  questionarioConPreguntasGet,
  questionarioContestadoGet,
} = require('../controllers/questionarios');
const router = Router();

router.get(
  '/preguntas/:id',
  [validarJWT, existeUsuario, existeQuestionario],
  questionarioConPreguntasGet
);
router.get(
  '/contestado',
  [
    validarJWT,
    existeAlumno,
    check('id_questionario', 'El id_questionario es obligatorio')
      .not()
      .isEmpty(),
    validarCampos,
    existeQuestionario,
  ],
  questionarioContestadoGet
);
router.post(
  '/',
  [
    validarJWT,
    existeProfesor,
    check('id_asignacion', 'El id_asignacion es obligatorio').not().isEmpty(),
    check('nivel', 'El nivel es obligatorio').not().isEmpty(),
    existeAsignacion,
    validarCampos,
  ],
  questionarioPost
);
router.get('/:id', [validarJWT, existeUsuario], questionarioGet);

module.exports = router;
