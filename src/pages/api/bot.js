// const TelegramBot = require('node-telegram-bot-api');

// export default async function account(req, res) {
//   console.log(req.body);
//   console.log('-------------');

//   const token ='6674000394:AAE5B5t7BpDI-RLD4C5zdbYyRqmG7h_1Uac'; // Asegúrate de que el token esté definido
//   const bot = new TelegramBot(token, { polling: true });

//   function sendMSG() {
//     try {
//       const message = req.body.data;

//       // Verificar si el mensaje es una cadena y no está vacío
//       if (typeof message !== 'string' || message.trim() === '') {
//         throw new Error('Message text is empty, undefined, or not a string');
//       }

//       // Enviar el mensaje
//       bot.sendMessage(6488746167, message);

//       // Enviar la foto si se proporciona una URL
//       if (req.body.url) {
//         bot.sendPhoto(6488746167, req.body.url);
//       }

//       bot.stopPolling();
//       return res.json({ msg: 'Bot SuccessFull' });
//     } catch (err) {
//       console.log(`Bot Error: ${err.message}`);
//       bot.stopPolling();
//       return res.status(400).json({ msg: `Bot Error: ${err.message}` });
//     }
//   }

//   sendMSG();
// }




// --------------------- DATOS PRODUCCION

const TelegramBot = require('node-telegram-bot-api');

export default async function account(req, res) {
  console.log(req.body)

  async function sendMSG() {

    const token = '6674000394:AAE5B5t7BpDI-RLD4C5zdbYyRqmG7h_1Uac';
    const bot = new TelegramBot(token, { polling: true });

    try {
      await bot.sendMessage(6073170955, req.body.data);
      // if (req.body.url) {
      //   await bot.sendPhoto(6488746167, req.body.url);
      // }
      // req.body?.url && req.body?.url !== undefined && bot.sendPhoto(6488746167, req.body.url);
      // bot.sendMessage(6073170955, req.body.data);
      // bot.sendPhoto(6073170955, req.body.url);
      // bot.stopPolling()
      return res.json({ msg: 'Bot SuccessFull' })
    } catch (err) {
      console.log(`Bot Error: ${err}`)
      return res.json({ msg: `Bot Error: ${err}` })        
    } finally {
      bot.stopPolling(); // Detener el polling solo después de que la respuesta ha sido enviada
    }
  }
  sendMSG()
}



// // --------------------- DATOS DESARROLLO

// const TelegramBot = require('node-telegram-bot-api');

// export default async function account(req, res) {
//   console.log(req.body)
//   console.log('-------------')

//   const token = '6674000394:AAE5B5t7BpDI-RLD4C5zdbYyRqmG7h_1Uac';
//   const bot = new TelegramBot(token, { polling: true });

//   function sendMSG() {
//     bot.sendMessage(6488746167, req.body.data);
//     bot.sendPhoto(6488746167, req.body.url);
//     bot.stopPolling()
//     return res.json({ success: 'true' })
//   }
//   sendMSG()
// }

