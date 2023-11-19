const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  dispositivosPost,
  dispositivosGet,
  dispositivoDelete,
  dispositivosPorIdGet,
} = require('../controllers/dispositivos');
const { existeUsuario } = require('../middlewares/validar-existe');

const router = Router();

router.get('/', [validarJWT, existeUsuario], dispositivosGet);
router.get(
  '/mis-dispositivos',
  [validarJWT, existeUsuario],
  dispositivosPorIdGet
);
router.post(
  '/',
  [
    validarJWT,
    existeUsuario,
    check('uuid_dispositivo', 'El uuid_dispositivo es obligatorio')
      .not()
      .isEmpty(),
    validarCampos,
  ],
  dispositivosPost
);
router.delete(
  '/:id',
  [
    validarJWT,
    existeUsuario,
    check('uuid_dispositivo', 'El uuid_dispositivo es obligatorio')
      .not()
      .isEmpty(),
    validarCampos,
  ],
  dispositivoDelete
);

module.exports = router;
