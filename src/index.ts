import tomcat from '@gostarehnegar/tomcat'
import TelegramBot from 'node-telegram-bot-api'
tomcat.config.data.redis.publicUrl = "redis://localhost:6379";
tomcat.config.messaging.transports.websocket.diabled = true;
const bus = tomcat.Domain.Services.getBus()
const redisBus = new tomcat.Infrastructure.Bus.RedisBus();


const token = '2140430977:AAHd0qR1mUiQdxXKgG_8RfgJ7oR63JJSDqs';
const bot = new TelegramBot(token, { polling: true },);
redisBus.publish("bots/telegram/controls/started", { port: null, id: "telegram" })

// class Subscriptions {
//     public items: { chatId: string, sub: string }[] = []
//     getSubscriptions(id: string) {
//         const subs = []
//         this.items.forEach((x) => {
//             if (x.chatId == id) {
//                 subs.push(x.sub)
//             }
//         })
//         return subs
//     }
// }

// bot.onText(/\/subscribe/, (msg) => {

//     bot.sendMessage(msg.chat.id, "which?", {
//         "reply_markup": {
//             "keyboard": [["mohsen"]]
//         }
//     });

// });
// bot.onText(/\/unsubscribe/, (msg) => {
//     const sub = subs.getSubscriptions(msg.chat.id)
//     bot.sendMessage(msg.chat.id, "which one?", {
//         "reply_markup": {
//             "keyboard": [sub]
//         }
//     });

// });
// const subscribed = false
// bot.onText(/\/start/, (msg) => {
//     if (!subscribed) {
//         bus.subscribe("bots/mohsen/wallet/*", (m) => {
//             const message = m.content<{ doge: number, usdt: number, time: string }>()
//             if (m.Topic.includes("buy")) {
//                 bot.sendMessage(msg.chat.id, `bought ${message.doge} DOGE at ${message.time} usdt : ${message.usdt}`)
//             }
//             else if (m.Topic.includes("sell")) {
//                 bot.sendMessage(msg.chat.id, `sold ${message.usdt} worth of doge at ${message.time} doge : ${message.usdt}`)
//             }
//         })
//         bot.sendMessage(msg.chat.id , "subscribed")
//     }
//     bot.sendMessage(msg.chat.id, "already subscribed")
// });
// `logger/${level}`
bot.onText(/\/start/, (msg) => {
    bus.subscribe('logger/*',async (m)=>{
        const message = m.message.cast<{message:unknown , params:unknown[]}>()
        bot.sendMessage(msg.chat.id , message.message)
    })
})
// const subs = new Subscriptions()
// bot.on('message', (msg) => {
//     if (msg.text.indexOf("mohsen") === 0) {
//         const a = subs.getSubscriptions(msg.chat.id)
//         if (a.indexOf("mohsen") < 0) {

//             bus.subscribe("bots/mohsen/controls/*", (m) => {
//                 const message = m.content<{ port: number, id: string }>();
//                 bot.sendMessage(msg.chat.id, `<a href="http://127.0.0.1:${message.port}/trades">Trades</a>`, { parse_mode: "HTML" });
//             })
//             bus.subscribe("bots/mohsen/signals/*", (m) => {
//                 const message = m.content<{ signal: string, candle: tomcat.Domain.Base.CandleStickData }>();
//                 bot.sendMessage(msg.chat.id, `${message.signal} recevied at ${message.candle.closeTime} price : ${message.candle.close}`);

//             })
//             bot.sendMessage(msg.chat.id, "subscribed to mohsen");
//             subs.items.push({ chatId: msg.chat.id, sub: "mohsen" })
//         } else {

//             bot.sendMessage(msg.chat.id, "already subscribed to mohsen");
//         }
//     }
// });
// bot.on('error', (err) => {
//     console.log(err);
// })