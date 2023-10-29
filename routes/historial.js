const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  existeUsuario,
  existeLectura,
  existeAlumno,
} = require('../middlewares/validar-existe');
const {
  historialPorIdGet,
  historialPost,
} = require('../controllers/historial');
const router = Router();

router.post(
  '/',
  [
    validarJWT,
    existeAlumno,
    check('id_lectura', 'El id_lectura es obligatorio').not().isEmpty(),
    check('avance', 'El avance es obligatorio').not().isEmpty(),
    validarCampos,
    existeLectura,
  ],
  historialPost
);
router.get('/', [validarJWT, existeUsuario], historialPorIdGet);

module.exports = router;
