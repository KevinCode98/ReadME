const { Router } = require('express');
const {
  nacionalidadesGet,
  nacionalidadGet,
} = require('../controllers/nacionalidades');

const router = Router();

router.get('/', nacionalidadesGet);
router.get('/:id', nacionalidadGet);

module.exports = router;
