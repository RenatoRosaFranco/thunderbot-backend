require('dotenv').config();

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendUserConfirmationEmail = async (email, name, subject) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'ThunderBot <contato@thunderbot.org>',
            to: email,
            subject: 'Recebemos seu contato',
            html: `
                <p>Olá ${name},</p>
                <p>Recebemos sua mensagem com o assunto "${subject}". Nossa equipe entrará em contato com você em breve.</p>
                <p>Obrigado,<br>Renato Franco & Time ThunderBot</p>
            `,
        });

        if (error) {
            throw new Error('Erro ao enviar confirmação para o usuário.');
        }

        return data;
    } catch (error) {
        console.error('Erro ao enviar confirmação para o usuário:', error);
        throw error;
    }
};

const sendAdminNotificationEmail = async (adminEmail, { name, phone, email, subject, message }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'ThunderBot <contato@thunderbot.org>',
            to: adminEmail,
            subject: `Novo contato: ${subject}`,
            html: `
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Telefone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Assunto:</strong> ${subject}</p>
                <p><strong>Mensagem:</strong><br>${message}</p>
            `,
        });

        if (error) {
            throw new Error('Erro ao enviar detalhes do contato.');
        }

        return data;
    } catch (error) {
        console.error('Erro ao enviar detalhes do contato:', error);
        throw error;
    }
};

module.exports = {
    sendUserConfirmationEmail,
    sendAdminNotificationEmail,
};