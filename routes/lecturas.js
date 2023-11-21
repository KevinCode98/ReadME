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
  lecturaSalirPost,
  lecturasLeidasGet,
} = require('../controllers/lecturas');

const router = Router();

router.get('/', [validarJWT, existeUsuario], lecturasGet);
router.get(
  '/mas-puntuadas',
  [validarJWT, existeUsuario],
  lecturasMasPuntuadasGet
);
router.get('/leidas', [validarJWT, existeUsuario], lecturasLeidasGet);
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
    validarCampos,
    existeAutor,
    existeTematica,
    existeCorriente,
  ],
  lecturaPost
);
router.post(
  '/salir-lectura',
  [
    validarJWT,
    existeUsuario,
    check('id_lectura', 'El id_lectura es obligatorio').not().isEmpty(),
    check('tiempo', 'El tiempo es obligatorio').not().isEmpty(),
    check('pagina', 'La pagina es obligatorio').not().isEmpty(),
    check('alto', 'El alto es obligatorio').not().isEmpty(),
    check('ancho', 'El ancho es obligatorio').not().isEmpty(),
    check('escala', 'La escala es obligatoria').not().isEmpty(),
    check('termino', 'El termino es obligatorio').not().isEmpty(),
    check('tiempoCliente', 'La tiempoCliente no es válida')
      .isISO8601()
      .toDate(),
    check('tiempoCliente', 'El tiempoCliente es obligatorio').not().isEmpty(),
    validarCampos,
    existeLectura,
  ],
  lecturaSalirPost
);
router.get('/:id', [validarJWT, existeUsuario, existeLectura], lecturaGet);

module.exports = router;
