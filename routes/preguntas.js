const { check } = require('express-validator');
const { Router } = require('express');
const { preguntaGet, preguntaPost } = require('../controllers/preguntas');

const router = Router();

router.get('/:id', preguntaGet);
router.post(
  '/',
  [
    check('id_questionario', 'El id_questionario es obligatorio')
      .not()
      .isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('cerrada', 'El campo cerrada es obligatoria').isBoolean(),
  ],
  preguntaPost
);
module.exports = router;
