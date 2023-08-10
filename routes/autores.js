const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  autorActualizarPost,
  autoresGet,
  autoresNombreGet,
  autorGet,
  autorPost,
} = require('../controllers/autores');

const router = Router();

router.get('/', autoresGet);
router.get('/:id', autorGet);
router.get('/buscador/nombre/', autoresNombreGet);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  autorPost
);
router.post(
  '/actualizar/:id',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  autorActualizarPost
);

module.exports = router;
