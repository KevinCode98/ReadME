const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  lecturaGet,
  lecturasGet,
  lecturaPost,
  lecturaNombreGet,
} = require('../controllers/lecturas');

const router = Router();

router.get('/', lecturasGet);
router.get('/:id', lecturaGet);
router.get('/buscador/nombre/', lecturaNombreGet);
router.post(
  '/',
  [
    check('id_autor', 'El id_autor es obligatorio').not().isEmpty(),
    check('titulo', 'El titulo es obliagorio').not().isEmpty(),
    check('genero', 'El genero es obliagorio').not().isEmpty(),
    check('texto', 'El texto es obliagorio').not().isEmpty(),
    check('corriente_literaria', 'El corriente_literaria es obliagorio')
      .not()
      .isEmpty(),
    validarCampos,
  ],
  lecturaPost
);

module.exports = router;
