const cron = require('node-cron');
const Gasto = require('../models/Gasto');
const emailService = require('./emailService'); // se emailService.js estiver na mesma pasta
 // Aqui você precisaria de uma função para enviar e-mails

// Tarefa agendada para rodar diariamente
cron.schedule('0 9 * * *', async () => {
  const today = new Date();
  const gastos = await Gasto.findAll({
    where: {
      data: {
        [Op.gte]: today,
      },
      tipo: 'fixo', // Apenas gastos fixos
    },
  });
  
  gastos.forEach(gasto => {
    sendEmail(gasto.recebedor, 'Alerta de Pagamento', `O pagamento de ${gasto.subtitulo} vence em breve.`);
  });
});
