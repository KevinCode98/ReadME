const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { autoresGet, autorGet, autorPost } = require('../controllers/autores');

const router = Router();

router.get('/', autoresGet);
router.get('/:id', autorGet);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  autorPost
);

module.exports = router;
