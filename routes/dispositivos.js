const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  dispositivosPost,
  dispositivosGet,
  dispositivoDelete,
} = require('../controllers/dispositivos');

const router = Router();

router.get('/', [validarJWT], dispositivosGet);
router.post(
  '/',
  [
    validarJWT,
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
    check('uuid_dispositivo', 'El uuid_dispositivo es obligatorio')
      .not()
      .isEmpty(),
    validarCampos,
  ],
  dispositivoDelete
);

module.exports = router;
