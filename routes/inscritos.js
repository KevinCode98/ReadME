const { check } = require('express-validator');
const { Router } = require('express');
const { inscritosGet, inscritosPost } = require('../controllers/inscritos');

const router = Router();

router.get('/:id', inscritosGet);
router.post(
  '/',
  [
    check('id_sala', 'El id_sala es obligatorio').not().isEmpty(),
    check('id_usuario', 'El id_usuario es obligatorio').not().isEmpty(),
  ],
  inscritosPost
);

module.exports = router;
