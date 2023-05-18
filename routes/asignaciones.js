const { check } = require('express-validator');
const { Router } = require('express');
const {
  asignacionGet,
  asignacionPost,
} = require('../controllers/asignaciones');

const router = Router();

router.get('/:id', asignacionGet);
router.post(
  '/',
  [
    check('id_sala', 'El id_sala es obligatorio').not().isEmpty(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
  ],
  asignacionPost
);

module.exports = router;
