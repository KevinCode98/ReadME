const { Router } = require('express');
const {
  alumnoGet,
  alumnosGet,
  alumnosNombreGet,
} = require('../controllers/alumnos');

const router = Router();

router.get('/', alumnosGet);
router.get('/:id', alumnoGet);
router.get('/buscador/nombre/', alumnosNombreGet);

module.exports = router;
