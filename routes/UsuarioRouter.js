import express from 'express';
import { login, registrar, perfil, confirmar, olvidePassword, comprobarToken, cambiarPassword, actualizarPerfil } from '../controllers/usuarioController.js';
import verifyAuth from '../middleware/authMiddleware.js';

const router = express.Router();


// public
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', login); // authentification
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(cambiarPassword);


router.get('/perfil', verifyAuth, perfil);
router.put('/perfil/:id', verifyAuth, actualizarPerfil); // Actualizar perfil





export default router;