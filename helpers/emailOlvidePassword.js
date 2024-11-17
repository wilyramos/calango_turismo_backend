import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const { email, name, token } = datos;

    const info = await transporter.sendMail({
        from: "Visita Calango - Turismo",
        to: email,
        subject: 'Restablece tu contraseña',
        text: 'Restablece tu contraseña en VisitCalango',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
                <h1 style="color: #2c3e50;">¡Hola ${name}!</h1>
                <p style="font-size: 16px; color: #34495e;">
                    Hemos recibido una solicitud para restablecer tu contraseña en VisitCalango. Si no fuiste tú, por favor ignora este correo.
                </p>
                <p style="font-size: 16px; color: #34495e;">
                    Para restablecer tu contraseña, haz clic en el siguiente enlace:
                </p>
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}" style="background-color: #3498db; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                    Restablecer Contraseña
                </a>
                <p style="font-size: 14px; color: #7f8c8d; margin-top: 20px;">
                    Si no solicitaste este cambio, por favor contacta con nuestro soporte.
                </p>
            </div>
        `
    });

    console.log('Mensaje enviado', info.messageId);
};

export default emailOlvidePassword;
