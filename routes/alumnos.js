const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  alumnoGet,
  alumnosGet,
  alumnosNombreGet,
  alumnoSalasInscritasGet,
  alumnoAceptarSalaPost,
  alumnoCancelarSalaDelete,
  alumnoEliminarInscritoSalaDelete,
} = require('../controllers/alumnos');
const {
  existeAlumno,
  existeUsuario,
  existeSala,
} = require('../middlewares/validar-existe');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', [validarJWT, existeUsuario], alumnosGet);
router.get('/:id', [validarJWT, existeUsuario], alumnoGet);
router.get('/buscador/nombre/', [validarJWT, existeUsuario], alumnosNombreGet);
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
router.delete(
  '/salir-sala',
  [
    validarJWT,
    existeAlumno,
    check('id_sala', 'El id_sala es obligatorio').not().isEmpty(),
    validarCampos,
    existeSala,
  ],
  alumnoEliminarInscritoSalaDelete
);

module.exports = router;
