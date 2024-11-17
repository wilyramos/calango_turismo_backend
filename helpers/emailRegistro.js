import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {

    const tranportador = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    const { email, name, token } = datos;

    const info = await tranportador.sendMail({
        from: "Visita Calango - Turismo",
        to: email,
        subject: 'Confirma tu cuenta',
        text: 'Confirma tu cuenta en VisitCalango',
        html: `
            <h1>Hola ${name}</h1>
            <p>Confirma tu cuenta en VisitCalango</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a>
        `
    });

    console.log('Mensaje enviado', info.messageId);
}

export default emailRegistro;