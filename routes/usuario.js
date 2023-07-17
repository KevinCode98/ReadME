const { check } = require('express-validator');
const { Router } = require('express');

const { usuariosGet, usuarioGet } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.get('/:id', usuarioGet);

module.exports = router;
