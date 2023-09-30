const { check } = require('express-validator');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { salasGet, salasPost, salaGet } = require('../controllers/salas');
const {
  existeUsuario,
  existeProfesor,
} = require('../middlewares/validar-existe');

const router = Router();

router.get('/', [validarJWT, existeUsuario], salasGet);
router.get('/:id', [validarJWT, existeUsuario], salaGet);
router.post(
  '/',
  [
    validarJWT,
    existeProfesor,
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  salasPost
);

module.exports = router;
