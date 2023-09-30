const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  existeProfesor,
  existeTematica,
  existeCorriente,
  existeAutor,
  existeLectura,
} = require('../middlewares/validar-existe');
const {
  lecturaGet,
  lecturasGet,
  lecturaPost,
  lecturaNombreGet,
  lecturasTextoGet,
} = require('../controllers/lecturas');

const router = Router();

router.get('/', lecturasGet);
router.get('/:id', lecturaGet);
router.get('/texto/:id', lecturasTextoGet);
router.get('/buscador/nombre/', lecturaNombreGet);
router.post(
  '/',
  [
    validarJWT,
    existeProfesor,
    check('id_autor', 'El id_autor es obligatorio').not().isEmpty(),
    check('titulo', 'El titulo es obliagorio').not().isEmpty(),
    check('tematica', 'El tematica es obliagorio').not().isEmpty(),
    check('corriente_literaria', 'El corriente_literaria es obliagorio')
      .not()
      .isEmpty(),
    existeAutor,
    existeTematica,
    existeCorriente,
    validarCampos,
  ],
  lecturaPost
);

module.exports = router;
