const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeUsuario } = require('../middlewares/validar-existe');
const { historialPorIdGet } = require('../controllers/historial');
const router = Router();

router.get('/', [validarJWT, existeUsuario], historialPorIdGet);

module.exports = router;
