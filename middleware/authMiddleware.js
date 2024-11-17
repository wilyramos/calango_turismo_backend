import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const verifyAuth = async (req, res, next) => {

    let token;

    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = await Usuario.findById(decoded.id).select('-password');

            // console.log(req.usuario);
            return next();

        } catch (error) {
            res.status(401).json({ msg: 'Token invalido' });
        }
    }
    if(!token) {
        res.status(401).json({ msg: 'No autorizado, no hay token' });
    }

    next();
};

export default verifyAuth;
