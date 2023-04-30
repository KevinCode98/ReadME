const { check } = require('express-validator');
const { Router } = require('express');
const { tutoradoGet, tutoradoPost } = require('../controllers/tutorados');

const router = Router();

router.get('/:id', tutoradoGet);
router.post(
  '/',
  [
    check('id_tutorado', 'El id_tutorado es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('parentesco', 'El parentesco no es válido').isIn([
      'Padre',
      'Madre',
      'Abuelo/a',
      'Familiar',
    ]),
  ],
  tutoradoPost
);

module.exports = router;
