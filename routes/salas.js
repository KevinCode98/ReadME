const { check } = require('express-validator');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  salasGet,
  salasPost,
  salaGet,
  salasActualizarPost,
} = require('../controllers/salas');
const {
  existeUsuario,
  existeProfesor,
  existeSala,
} = require('../middlewares/validar-existe');

const router = Router();

router.get('/', [validarJWT, existeUsuario], salasGet);
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
router.post(
  '/actualizar',
  [
    validarJWT,
    existeProfesor,
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('id_sala', 'La id_sala es obligatoria').not().isEmpty(),
    validarCampos,
    existeSala,
  ],
  salasActualizarPost
);
router.get('/:id', [validarJWT, existeUsuario], salaGet);

module.exports = router;
