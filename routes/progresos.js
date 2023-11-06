const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  existeAlumno,
  existeLectura,
  existeUsuario,
} = require('../middlewares/validar-existe');
const {
  progresosPost,
  progresosPorIdGet,
  progresosPorLecturaAlumnoGet,
  progresosPorDia,
} = require('../controllers/progresos');

const router = Router();

router.get('/mi-dia', [validarJWT, existeAlumno], progresosPorDia);
router.get(
  '/mi-lectura/:id',
  [validarJWT, existeAlumno, existeLectura],
  progresosPorLecturaAlumnoGet
);
router.get('/', [validarJWT, existeUsuario], progresosPorIdGet);
module.exports = router;
