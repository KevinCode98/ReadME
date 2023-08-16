const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  profesoresGet,
  profesoresNombreGet,
  profesorGet,
  profesorSalasGet,
  profesorSalaInscritosGet,
} = require('../controllers/profesores');

const router = Router();

router.get('/', profesoresGet);
router.get('/salas', [validarJWT], profesorSalasGet);
router.get('/inscritos/:sala', [validarJWT], profesorSalaInscritosGet);
router.get('/:id', profesorGet);
router.get('/buscador/nombre/', profesoresNombreGet);

module.exports = router;
