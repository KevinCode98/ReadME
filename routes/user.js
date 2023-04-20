const { Router } = require('express');
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  loginUser,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.get('/login', loginUser);
router.post('/', usuariosPost);
router.put('/:id', usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/', usuariosDelete);

module.exports = router;
