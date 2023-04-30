const { check } = require('express-validator');
const { Router } = require('express');
const { lecturaGet, lecturasGet } = require('../controllers/lecturas');

const router = Router();

router.get('/', lecturasGet);
router.get('/:id', lecturaGet);

module.exports = router;
