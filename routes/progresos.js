const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  progresosPost,
  progresosPorIdGet,
} = require('../controllers/progresos');

const router = Router();

router.get('/', [validarJWT], progresosPorIdGet);
router.post(
  '/',
  [
    validarJWT,
    check('id_lectura', 'El id_lectura es obligatorio').not().isEmpty(),
    check('tiempo', 'El tiempo es obligatorio').not().isEmpty(),
    check('fecha', 'Formato invalido en la fecha').isISO8601().toDate(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  progresosPost
);

module.exports = router;
