const { check } = require('express-validator');
const { Router } = require('express');
const { salasGet, salasPost, salaGet } = require('../controllers/salas');

const router = Router();

router.get('/', salasGet);
router.get('/:id', salaGet);
router.post(
  '/',
  [
    check('id_responsable', 'El id_responsable es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
  ],
  salasPost
);

module.exports = router;
