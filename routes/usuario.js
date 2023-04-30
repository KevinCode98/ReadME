const { check } = require('express-validator');
const { Router } = require('express');

const {
  usuariosGet,
  usuariosDelete,
  usuarioGet,
  loginUser,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.get('/:id', usuarioGet);
router.delete('/', usuariosDelete);
router.post(
  '/login',
  [
    check('email', 'El email no es valido').isEmail(),
    check('password', 'El password no es valido').isLength({
      min: 6,
    }),
  ],
  loginUser
);

module.exports = router;
