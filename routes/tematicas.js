const { Router } = require('express');
const { tematicasGet, tematicaGet } = require('../controllers/tematicas');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeUsuario } = require('../middlewares/validar-existe');

const router = Router();

router.get('/', [validarJWT, existeUsuario], tematicasGet);
router.get('/:id', [validarJWT, existeUsuario], tematicaGet);

module.exports = router;
