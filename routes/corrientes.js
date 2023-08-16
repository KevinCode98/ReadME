const { Router } = require('express');
const { corrientesGet, corrienteGet } = require('../controllers/corrientes');

const router = Router();

router.get('/', corrientesGet);
router.get('/:id', corrienteGet);

module.exports = router;
