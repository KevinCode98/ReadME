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
const { existeProfesor } = require('../middlewares/validar-existe');

const router = Router();

router.get('/', profesoresGet);
router.get('/:id', [existeProfesor], profesorGet);
router.get('/salas', [validarJWT], profesorSalasGet);
router.get('/inscritos/:sala', [validarJWT], profesorSalaInscritosGet);
router.get('/buscador/nombre/', profesoresNombreGet);
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

module.exports = router;
