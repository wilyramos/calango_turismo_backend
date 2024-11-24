import express from 'express';
import verifyAuth from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();


// public
router.get('/', verifyAuth, isAdmin, (req, res) => {
    res.json({ msg: 'Dashboard' });
});

router.get('/hospedajes', verifyAuth, isAdmin, (req, res) => {
    res.json({ msg: 'hospedajes' });
});

router.get('/actividades-eventos', verifyAuth, isAdmin, (req, res) => {
    res.json({ msg: 'Places' });
});

router.get('/restaurantes', verifyAuth, isAdmin, (req, res) => {
    res.json({ msg: 'Places' });
});


export default router;