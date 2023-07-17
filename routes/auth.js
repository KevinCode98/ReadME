const { check } = require('express-validator');
const { Router } = require('express');
const { authPost } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  authPost
);

module.exports = router;
