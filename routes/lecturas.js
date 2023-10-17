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
  existeUsuario,
} = require('../middlewares/validar-existe');
const {
  lecturaGet,
  lecturasGet,
  lecturaPost,
  lecturaNombreGet,
  lecturasTextoGet,
  lecturasMasPuntuadasGet,
} = require('../controllers/lecturas');

const router = Router();

router.get('/', [validarJWT, existeUsuario], lecturasGet);
router.get(
  '/mas-puntuadas',
  [validarJWT, existeUsuario],
  lecturasMasPuntuadasGet
);
router.get(
  '/texto/:id',
  [validarJWT, existeUsuario, existeLectura],
  lecturasTextoGet
);
router.get('/buscador/nombre/', [validarJWT, existeUsuario], lecturaNombreGet);
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
router.get('/:id', [validarJWT, existeUsuario, existeLectura], lecturaGet);

module.exports = router;
