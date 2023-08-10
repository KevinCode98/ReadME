const { check } = require('express-validator');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { salasGet, salasPost, salaGet } = require('../controllers/salas');

const router = Router();

router.get('/', salasGet);
router.get('/:hash', salaGet);
router.post(
  '/',
  [
    validarJWT,
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  salasPost
);

module.exports = router;
