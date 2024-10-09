// src/utils/emailService.js

const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Altere para seu servidor SMTP
    port: 587,
    secure: false, // true para 465, false para outros
    auth: {
      user: 'your_email@example.com', // Seu e-mail
      pass: 'your_password', // Sua senha
    },
  });

  const info = await transporter.sendMail({
    from: '"Nome" <your_email@example.com>', // Endereço do remetente
    to, // Lista de destinatários
    subject, // Assunto do e-mail
    text, // Texto do corpo
  });

  console.log('Mensagem enviada: %s', info.messageId);
};

module.exports = { sendEmail };
