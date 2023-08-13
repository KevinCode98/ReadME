const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  profesoresGet,
  profesoresNombreGet,
  profesorGet,
  profesorSalasGet,
} = require('../controllers/profesores');

const router = Router();

router.get('/', profesoresGet);
router.get('/salas', [validarJWT], profesorSalasGet);
router.get('/:id', profesorGet);
router.get('/buscador/nombre/', profesoresNombreGet);

module.exports = router;
