const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tutoradoGet, tutoradoPost } = require('../controllers/tutorados');
const { existeUsuario } = require('../middlewares/validar-existe');

const router = Router();

router.get('/:id', [validarJWT, existeUsuario], tutoradoGet);
router.post(
  '/',
  [
    check('id_tutorado', 'El id_tutorado es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    check('parentesco', 'El parentesco no es válido').isIn([
      'Padre',
      'Madre',
      'Abuelo/a',
      'Familiar',
    ]),
    validarCampos,
  ],
  tutoradoPost
);

module.exports = router;
