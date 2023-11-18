const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  profesoresGet,
  profesoresNombreGet,
  profesorGet,
  profesorSalasGet,
  profesorSalaInscritosGet,
  profesorEliminarInscritoSalaDelete,
} = require('../controllers/profesores');
const {
  existeProfesor,
  existeUsuario,
  existeSala,
  existeAlumno,
} = require('../middlewares/validar-existe');

const router = Router();

router.get('/', [validarJWT, existeUsuario], profesoresGet);
router.get('/salas', [validarJWT, existeProfesor], profesorSalasGet);
router.get(
  '/inscritos/:sala',
  [validarJWT, existeUsuario],
  profesorSalaInscritosGet
);
router.get(
  '/buscador/nombre/',
  [validarJWT, existeUsuario],
  profesoresNombreGet
);

router.delete(
  '/salir-sala',
  [
    validarJWT,
    existeProfesor,
    check('id_sala', 'El id_sala es obligatorio').not().isEmpty(),
    check('id_alumno', 'El id_alumno es obligatorio').not().isEmpty(),
    validarCampos,
    existeSala,
  ],
  profesorEliminarInscritoSalaDelete
);
router.get('/:id', [validarJWT, existeUsuario], profesorGet);

module.exports = router;
