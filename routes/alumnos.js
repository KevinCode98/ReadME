const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  alumnoGet,
  alumnosGet,
  alumnosNombreGet,
  alumnoSalasInscritasGet,
} = require('../controllers/alumnos');

const router = Router();

router.get('/', alumnosGet);
router.get('/:id', alumnoGet);
router.get('/buscador/nombre/', alumnosNombreGet);
router.get('/salas/inscritos/', [validarJWT], alumnoSalasInscritasGet);

module.exports = router;
