const { check } = require('express-validator');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  asignacionGet,
  asignacionPost,
  asignacionesPorSalaGet,
  asignacionDelete,
} = require('../controllers/asignaciones');
const {
  existeProfesor,
  existeSala,
  existeUsuario,
  existeAsignacion,
} = require('../middlewares/validar-existe');

const router = Router();

router.get(
  '/salas/:id',
  [validarJWT, existeUsuario, existeSala],
  asignacionesPorSalaGet
);
router.post(
  '/',
  [
    validarJWT,
    existeProfesor,
    check('id_sala', 'El id_sala es obligatorio').not().isEmpty(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('tiempoCliente', 'El tiempoCliente es obligatorio').not().isEmpty(),
    check('tiempoCliente', 'La tiempoCliente no es válida')
      .isISO8601()
      .toDate(),
    validarCampos,
    existeSala,
  ],
  asignacionPost
);
router.delete(
  '/',
  [
    validarJWT,
    existeProfesor,
    check('id_asignacion', 'El id_asignacion es obligatorio').not().isEmpty(),
    validarCampos,
    existeAsignacion,
  ],
  asignacionDelete
);
router.get('/:id', [validarJWT, existeUsuario], asignacionGet);

module.exports = router;
