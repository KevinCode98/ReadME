const { check } = require('express-validator');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { inscritosGet, inscritosPost } = require('../controllers/inscritos');
const { existeProfesor, existeSala } = require('../middlewares/validar-existe');

const router = Router();

router.get('/:id', inscritosGet);
router.post(
  '/',
  [
    validarJWT,
    existeProfesor,
    check('id_sala', 'El id_sala es obligatorio').not().isEmpty(),
    check('id_alumno', 'El id_alumno es obligatorio').not().isEmpty(),
    existeSala,
    validarCampos,
  ],
  inscritosPost
);

module.exports = router;
