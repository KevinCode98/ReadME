const { check } = require('express-validator');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  salasGet,
  salasPost,
  salaGet,
  alumnoAceptarSalaPost,
  alumnoCancelarSalaDelete,
} = require('../controllers/salas');

const router = Router();

router.get('/', salasGet);
router.get('/:id', salaGet);
router.post('/aceptacion/:sala', [validarJWT], alumnoAceptarSalaPost);
router.delete('/cancelacion/:sala', [validarJWT], alumnoCancelarSalaDelete);
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
