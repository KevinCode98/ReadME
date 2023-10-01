const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeUsuarioPorId } = require('../helpers/validator');
const {
  usuarioActializarPost,
  usuarioDelete,
  usuarioGet,
  usuarioPost,
  usuariosGet,
  usuariosNombreGet,
} = require('../controllers/usuarios');
const { existeUsuario } = require('../middlewares/validar-existe');

const router = Router();

router.get('/', [validarJWT, existeUsuario], usuariosGet);
router.get('/:id', [validarJWT, existeUsuario], usuarioGet);
router.get('/buscador/nombre/', [validarJWT, existeUsuario], usuariosNombreGet);
router.post(
  '/',
  [
    check('email', 'El email no es válido').isEmail(),
    check('password', 'El password debe de ser más de 6 caracteres').isLength({
      min: 6,
    }),
    check('apodo', 'El apodo debe de ser más de 4 caracteres').isLength({
      min: 4,
    }),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    check('nacimiento', 'La fecha no es válida').isISO8601().toDate(),
    check('tipo_usuario', 'El tipo_usuario no es válido').isIn([
      'Alumno',
      'Profesor',
    ]),
    validarCampos,
  ],
  usuarioPost
);
router.post(
  '/actualizar/:id',
  [
    validarJWT,
    existeUsuario,
    check('apodo', 'El apodo debe de ser más de 4 caracteres').isLength({
      min: 4,
    }),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    check('nacimiento', 'La fecha no es válida').isISO8601().toDate(),
    validarCampos,
  ],
  usuarioActializarPost
);
router.delete(
  '/:id',
  [validarJWT, check('id').custom(existeUsuarioPorId), validarCampos],
  usuarioDelete
);

module.exports = router;
