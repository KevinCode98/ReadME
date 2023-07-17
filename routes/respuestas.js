const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { respuestasGet, respuestaPost } = require('../controllers/respuestas');

const router = Router();

router.get('/:id', respuestasGet);
router.post(
  '/',
  [
    check('id_pregunta', 'El id_pregunta es obligatorio').not().isEmpty(),
    check('id_usuario', 'El id_usuario es obligatorio').not().isEmpty(),
    check('texto_respuesta', 'El texto_respuesta es obligatorio')
      .not()
      .isEmpty(),
    validarCampos,
  ],
  respuestaPost
);

module.exports = router;
