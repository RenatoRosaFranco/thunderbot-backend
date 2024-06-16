const { sendUserConfirmationEmail, sendAdminNotificationEmail } = require('./services/emailService.cjs');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { name, phone, email, subject, message } = req.body;

    try {
        await sendUserConfirmationEmail(email, name, subject);
        await sendAdminNotificationEmail('renato_ny@live.com', { name, phone, email, subject, message });

        res.status(200).send('Emails enviados com sucesso.');
    } catch (error) {
        res.status(500).send('Erro ao enviar e-mails.');
    }
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});