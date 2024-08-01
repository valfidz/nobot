import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import cron from 'node-cron';
import { DateTime } from 'luxon';

dotenv.config();

const bot_token = process.env.BOT_TOKEN;
const jombsChatId = process.env.JOMBS_CHAT;
const chatId = process.env.CHAT_ID;
const bot = new TelegramBot(bot_token, { polling: true })

const message = "Jangan lupa isi timesheet gaes! Timesheet sekarang gabisa dirapel soalnya.";

const scheduleTime = '0 17 * * *'; // 17:00 (5 PM) in cron format
const schedule1 = '0 13 * * *';

function startSchedule() {
  try {
    // cron at 5 pm
    cron.schedule(scheduleTime, () => {
      const now = DateTime.local().setZone('Asia/Jakarta'); // Ensure the timezone is GMT+7
      console.log(`Sending message at: ${now.toFormat('HH:mm:ss')}`);
    
      bot.sendMessage(chatId, message);
    }, {
      scheduled: true,
      timezone: 'Asia/Jakarta' // set the timezone to GMT+7
    });
  } catch (error) {
    console.log("error", error.message);
  }
}


bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Welcome ${msg.chat.first_name}`);
});

bot.onText(/\/braincheck/, async (msg) => {
  // To implement the functionality to fetch the Joke from the API
  bot.sendMessage(msg.chat.id, `Just checking the command`);
});

if (bot) {
  console.log("Bot is running...")
}

export { startSchedule }