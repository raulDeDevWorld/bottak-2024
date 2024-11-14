// const TelegramBot = require('node-telegram-bot-api');



// export default async function account(req, res) {

//     const token = '7031417747:AAGr4T2ndCANwHiRTrV9RV0S8FjiQJNDeAQ';
//     const bot = new TelegramBot(token, { polling: true });

//     function sendMSG() {
//         bot.sendMessage(6488746167, 'Welcome to the bot...!');
//         return bot.stopPolling()
//     }

//     sendMSG()

// }











// const TelegramBot = require('node-telegram-bot-api');

// // replace the value below with the Telegram token you receive from @BotFather
// const token = '7031417747:AAGr4T2ndCANwHiRTrV9RV0S8FjiQJNDeAQ';

// // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, {polling: true});

// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
// console.log(msg.chat.id)
//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });

// // bot.sendMessage(chatId, 'Received your message')









// const TelegramBot = require('node-telegram-bot-api');
// const token = '7031417747:AAGr4T2ndCANwHiRTrV9RV0S8FjiQJNDeAQ';

// const bot = new TelegramBot(token, { polling: true });

// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   const messageText = msg.text;

//   if (messageText === '/start') {
//     bot.sendMessage(chatId, 'Welcome to the bot...!');
//   }
// });






// import Stripe from 'stripe'
// // const stripe = new Stripe(sk_test_51K4GxEEHzR9KDft7JvEtNpwEXsSlbWC5BsDaCJ5SCOWR91owjrjfhYJS0J9onrjGVrE7uXvaFoITNpz53cfx1MOK00kOAGB32S);


// const stripe = new Stripe('sk_test_51K4GxEEHzR9KDft7JvEtNpwEXsSlbWC5BsDaCJ5SCOWR91owjrjfhYJS0J9onrjGVrE7uXvaFoITNpz53cfx1MOK00kOAGB32S');

// export default async function handler(req, res) {
//   console.log(req)
//   console.log(req.body.amount)
//   try {
//     const session = await stripe.checkout.sessions.create({

//       line_items: [
//         {
//           price_data: {
//             product_data: {
//               name: req.body.type,
//             },
//             currency: req.body.currency,
//             unit_amount: req.body.amount * 100,
//           },
//           quantity: 1,
//         },
//         {
//           price_data: {
//             product_data: {
//               name: "Comision",
//             },
//             currency: req.body.currency,
//             unit_amount: req.body.comision * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",

//       success_url: "https://bottak.lat/Transferencias/Exitoso",
//       cancel_url: "https://bottak.lat/",
//     });
//     console.log(session)
//     console.log(session.url);
//     return res.json({
//       id: session.id,
//       url: session.url
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }

// export const createSession = async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             product_data: {
//               name: "Laptop",
//             },
//             currency: "usd",
//             unit_amount: 2000,
//           },
//           quantity: 1,
//         },
//         {
//           price_data: {
//             product_data: {
//               name: "TV",
//             },
//             currency: "usd",
//             unit_amount: 1000,
//           },
//           quantity: 2,
//         },
//       ],
//       mode: "payment",
//       success_url: "http://localhost:3000/Success",
//       cancel_url: "http://localhost:3000/Cancel",
//     });

//     console.log(session);
//     return res.json({ url: session.url });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };







