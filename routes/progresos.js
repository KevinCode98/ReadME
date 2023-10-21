const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  existeAlumno,
  existeLectura,
  existeUsuario,
  existeProgreso,
} = require('../middlewares/validar-existe');
const {
  progresosPost,
  progresosPorIdGet,
  progresosPorAlumnoGet,
  progresosPorLecturaAlumnoGet,
} = require('../controllers/progresos');

const router = Router();

router.get(
  '/mis-progresos',
  [validarJWT, existeAlumno, existeProgreso],
  progresosPorAlumnoGet
);
router.get(
  '/mi-lectura/:id',
  [validarJWT, existeAlumno, existeLectura],
  progresosPorLecturaAlumnoGet
);
router.post(
  '/',
  [
    validarJWT,
    existeAlumno,
    check('id_lectura', 'El id_lectura es obligatorio').not().isEmpty(),
    check('tiempo', 'El tiempo es obligatorio').not().isEmpty(),
    check('fecha', 'Formato invalido en la fecha').isISO8601().toDate(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    validarCampos,
    existeLectura,
  ],
  progresosPost
);
router.get('/', [validarJWT, existeUsuario], progresosPorIdGet);
module.exports = router;
