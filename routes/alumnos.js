const { check } = require('express-validator');
const { Router } = require('express');
const { alumnosGet, alumnoGet, alumnoPost } = require('../controllers/alumnos');

const router = Router();

router.get('/', alumnosGet);
router.get('/:id', alumnoGet);
router.post(
  '/',
  [
    check('email', 'El email no es válido').isEmail(),
    check('password', 'El password debe de ser más de 6 caracteres').isLength({
      min: 6,
    }),
    check('apodo', 'El apodo debe de ser más de 4 caracteres').isLength({
      min: 4,
    }),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('nacimiento', 'La fecha no es válida').isISO8601().toDate(),
  ],
  alumnoPost
);

module.exports = router;
