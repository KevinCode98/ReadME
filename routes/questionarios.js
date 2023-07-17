const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  questionarioGet,
  questionarioPost,
} = require('../controllers/questionarios');
const router = Router();

router.get('/:id', questionarioGet);
router.post(
  '/',
  [
    check('id_lectura', 'El id_lectura es obligatorio').not().isEmpty(),
    check('nivel', 'El nivel es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  questionarioPost
);

module.exports = router;
