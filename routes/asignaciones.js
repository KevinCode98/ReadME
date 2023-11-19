const { check } = require('express-validator');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  asignacionGet,
  asignacionPost,
  asignacionesPorSalaGet,
} = require('../controllers/asignaciones');
const {
  existeProfesor,
  existeSala,
  existeUsuario,
} = require('../middlewares/validar-existe');

const router = Router();

router.get('/:id', [validarJWT, existeUsuario], asignacionGet);
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
    check('tiempoCliente', 'La tiempoCliente no es válida')
      .isISO8601()
      .toDate(),
    validarCampos,
    existeSala,
  ],
  asignacionPost
);

module.exports = router;
