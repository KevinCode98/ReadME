const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeUsuario } = require('../middlewares/validar-existe');
const {
  historialPorIdGet,
  historialPost,
} = require('../controllers/historial');
const router = Router();

router.get('/', [validarJWT, existeUsuario], historialPorIdGet);
router.post(
  '/',
  [
    validarJWT,
    check('id_lectura', 'El id_lectura es obligatorio').not().isEmpty(),
    check('avance', 'El avance es obligatorio').not().isEmpty(),
    check('tiempo_final', 'El tiempo_final es obligatorio').not().isEmpty(),
    check('fecha_inicio', 'Formato invalido en la fecha_inicio')
      .isISO8601()
      .toDate(),
    check('fecha_inicio', 'La fecha_inicio es obligatoria').not().isEmpty(),
    check('fecha_final', 'Formato invalido en la fecha_final')
      .isISO8601()
      .toDate(),
    check('fecha_final', 'La fecha_final es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  historialPost
);

module.exports = router;
