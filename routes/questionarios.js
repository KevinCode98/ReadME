const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  existeProfesor,
  existeAsignacion,
  existeUsuario,
} = require('../middlewares/validar-existe');
const {
  questionarioGet,
  questionarioPost,
} = require('../controllers/questionarios');
const router = Router();

router.get('/:id', [validarJWT, existeUsuario], questionarioGet);
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

module.exports = router;
