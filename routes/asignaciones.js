const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  asignacionGet,
  asignacionPost,
  asignacionesPorSalaGet,
} = require('../controllers/asignaciones');

const router = Router();

router.get('/:id', asignacionGet);
router.get('/salas/:idSala', asignacionesPorSalaGet);
router.post(
  '/',
  [
    check('id_sala', 'El id_sala es obligatorio').not().isEmpty(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  asignacionPost
);

module.exports = router;
