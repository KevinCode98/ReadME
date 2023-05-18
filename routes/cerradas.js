const { check } = require('express-validator');
const { Router } = require('express');
const { cerradasGet, cerradaPost } = require('../controllers/cerradas');

const router = Router();

router.get('/:id', cerradasGet);
router.post(
  '/',
  [
    check('id_pregunta', 'El id_pregunta es obligatorio').not().isEmpty(),
    check('id_usuario', 'El id_usuario es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('correcta', 'Correcta es obligatorio').isBoolean(),
  ],
  cerradaPost
);

module.exports = router;
