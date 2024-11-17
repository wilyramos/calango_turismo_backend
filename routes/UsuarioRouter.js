import express from 'express';
import { login, registrar, perfil, actualizarPerfil, confirmar, olvidePassword, comprobarToken, cambiarPassword } from '../controllers/usuarioController.js';
import verifyAuth from '../middleware/authMiddleware.js';

const router = express.Router();


// public
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', login); // authentification
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(cambiarPassword);

router.get('/actualizarPerfil', actualizarPerfil);
router.get('/perfil', verifyAuth, perfil);


export default router;