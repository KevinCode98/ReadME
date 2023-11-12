const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  existeAlumno,
  existeLectura,
  existeUsuario,
} = require('../middlewares/validar-existe');
const {
  progresosPorDia,
  progresosPorIdGet,
  progresosPorLecturaAlumnoGet,
  progresosPorMes,
  progresosPorSemana,
} = require('../controllers/progresos');

const router = Router();
router.get('/mi-dia', [validarJWT, existeUsuario], progresosPorDia);
router.get('/mi-semana', [validarJWT, existeUsuario], progresosPorSemana);
router.get('/mi-mes', [validarJWT, existeUsuario], progresosPorMes);
router.get(
  '/mi-lectura/:id',
  [validarJWT, existeAlumno, existeLectura],
  progresosPorLecturaAlumnoGet
);
router.get('/', [validarJWT, existeUsuario], progresosPorIdGet);
module.exports = router;
