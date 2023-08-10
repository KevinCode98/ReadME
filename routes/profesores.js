const { Router } = require('express');
const {
  profesoresGet,
  profesoresNombreGet,
  profesorGet,
} = require('../controllers/profesores');

const router = Router();

router.get('/', profesoresGet);
router.get('/:id', profesorGet);
router.get('/buscador/nombre/', profesoresNombreGet);

module.exports = router;
