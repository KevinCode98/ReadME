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

router.post(
  '/eliminar/:id',
  [
    validarJWT,
    check('id_sala', 'El id_sala es obligatorio').not().isEmpty(),
    check('id_usuario', 'El id_usuario es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  profesorEliminarInscritoSalaDelete
);
router.get('/:id', [validarJWT, existeUsuario], profesorGet);

module.exports = router;
