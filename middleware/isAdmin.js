

const isAdmin = (req, res, next) => {
    if(req.usuario.role !== "admin"){
        return res.status(401).json({ msg: 'No autorizado, no eres administrador' });
    }
    next();
}

export default isAdmin;