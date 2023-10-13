const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  existeUsuario,
  existeAlarma,
} = require('../middlewares/validar-existe');
const {
  alarmaPost,
  alarmasPorIdGet,
  alarmaDelete,
} = require('../controllers/alarmas');
const router = Router();

router.get('/', [validarJWT, existeUsuario], alarmasPorIdGet);
router.post(
  '/',
  [
    validarJWT,
    existeUsuario,
    check('hora', 'La hora es obligatoria').isISO8601().toDate(),
    validarCampos,
  ],
  alarmaPost
);

router.delete('/:id', [validarJWT, existeUsuario, existeAlarma], alarmaDelete);

module.exports = router;
