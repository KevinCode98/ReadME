const { check } = require('express-validator');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  inscritosGet,
  inscritosPost,
  inscritosEliminarPost,
} = require('../controllers/inscritos');

const router = Router();

router.get('/:id', inscritosGet);
router.post(
  '/',
  [
    validarJWT,
    check('id_sala', 'El id_sala es obligatorio').not().isEmpty(),
    check('id_usuario', 'El id_usuario es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  inscritosPost
);
router.post(
  '/eliminar/:id',
  [
    validarJWT,
    check('id_sala', 'El id_sala es obligatorio').not().isEmpty(),
    check('id_usuario', 'El id_usuario es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  inscritosEliminarPost
);

module.exports = router;
