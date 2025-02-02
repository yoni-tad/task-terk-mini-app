const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Define your /start command for the Telegram bot
bot.onText('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    const welcomeButton = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Start To-Do Mini App',
                        callback_data: 'start_app'
                    }
                ]
            ]
        }
    };

    if(messageText === '/start') {
        bot.sendMessage(chatId, 'Welcome to Task Trek 🚀');
    }
});