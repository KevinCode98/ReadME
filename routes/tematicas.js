const { Router } = require('express');
const { tematicasGet, tematicaGet } = require('../controllers/tematicas');

const router = Router();

router.get('/', tematicasGet);
router.get('/:id', tematicaGet);

module.exports = router;
