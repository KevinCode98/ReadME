const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  alumnoGet,
  alumnosGet,
  alumnosNombreGet,
  alumnoSalasInscritasGet,
  alumnoAceptarSalaPost,
  alumnoCancelarSalaDelete,
} = require('../controllers/alumnos');
const {
  existeAlumno,
  existeUsuario,
} = require('../middlewares/validar-existe');

const router = Router();

router.get('/', [validarJWT, existeUsuario], alumnosGet);
router.get('/:id', [existeAlumno], alumnoGet);
router.get('/buscador/nombre/', alumnosNombreGet);
router.get(
  '/salas/inscritos/',
  [validarJWT, existeAlumno],
  alumnoSalasInscritasGet
);
router.post(
  '/aceptacion/:sala',
  [validarJWT, existeAlumno],
  alumnoAceptarSalaPost
);
router.delete(
  '/cancelacion/:sala',
  [validarJWT, existeAlumno],
  alumnoCancelarSalaDelete
);

module.exports = router;
