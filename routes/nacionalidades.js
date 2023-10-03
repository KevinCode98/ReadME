const { Router } = require('express');
const {
  nacionalidadesGet,
  nacionalidadGet,
} = require('../controllers/nacionalidades');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeUsuario } = require('../middlewares/validar-existe');

const router = Router();

router.get('/', [validarJWT, existeUsuario], nacionalidadesGet);
router.get('/:id', [validarJWT, existeUsuario], nacionalidadGet);

module.exports = router;
