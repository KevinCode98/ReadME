const { check } = require('express-validator');
const { Router } = require('express');
const { autoresGet, autorGet, autorPost } = require('../controllers/autores');

const router = Router();

router.get('/', autoresGet);
router.get('/:id', autorGet);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
  ],
  autorPost
);

module.exports = router;
