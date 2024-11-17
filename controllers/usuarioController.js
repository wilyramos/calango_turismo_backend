import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';
import Usuario from '../models/Usuario.js';
import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvidePassword from '../helpers/emailOlvidePassword.js';


const registrar = async (req, res) => {
    const { email } = req.body;
    const userExists = await Usuario.findOne({
        email
    });

    if (userExists) {
        const error = new Error('Usuario ya existe');
        return res.status(400).send({ error: error.message });
    }

    try {
        // Crear usuario
        const user = new Usuario(req.body);
        const userSaved = await user.save();

        // send email

        emailRegistro({
            email,
            name: userSaved.name,
            token: userSaved.token
        });

        res.json(userSaved);
    } catch (error) {
        res.status(400).send({ error: error.message });
    } 
};

const confirmar = async (req, res) => {

    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({
        token
    });

    if (!usuarioConfirmar) {
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = null;

        await usuarioConfirmar.save();
        res.json({ msg: 'Usuario confirmado correctamente' });
    } catch (error) {
        console.log(error);
    }

    console.log(usuarioConfirmar);
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await Usuario.findOne({
        email
    });

    if (!user) {
        const error = new Error('Usuario no existe');
        return res.status(400).send({ error: error.message });
    }

    if (!user.confirmado) {
        const error = new Error('Usuario no confirmado');
        return res.status(403).send({ error: error.message });
    }

    if(!( await user.comparePassword(password))) {
        const error = new Error('Contraseña incorrecta');
        return res.status(403).send({ error: error.message });
    }

    // Generate JWT
    const token = generarJWT(user.id);
    res.json({ token });    
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({
        email
    });

    if (!existeUsuario) {
        const error = new Error('El correo no existe');
        return res.status(400).json({ msg: error.message });
    }

    try{
        existeUsuario.token = generarId();
        await existeUsuario.save();

        emailOlvidePassword({
            email,
            name: existeUsuario.name,
            token: existeUsuario.token
        });

        res.json({ msg: 'Token enviado a su correo' });
    }
    catch (error) {
        console.log(error);
    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    console.log(token);

    const tokenValido = await Usuario.findOne({
        token
    });

    if (tokenValido) {
        res.json({ msg: 'Token valido' });
    }
    else {
        res.status(400).json({ msg: 'Token no valido' });
    }
};

const cambiarPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({
        token
    });

    if (!usuario) {
        res.status(400).json({ msg: 'Token no valido' });
    }

    try {
        usuario.password = password;
        usuario.token = null;
        await usuario.save();
        res.json({ msg: 'Contraseña cambiada' });
    } catch (error) {
        console.log(error);
    }
}

const perfil = (req, res) => {
    const { usuario } = req;
    res.json({ usuario }); 
};


const actualizarPerfil = (req, res) => {
    res.send('Atualizar perfil usuário');
};

export { 
    registrar, 
    login,
    perfil,
    actualizarPerfil,
    confirmar,
    olvidePassword,
    comprobarToken,
    cambiarPassword
};
