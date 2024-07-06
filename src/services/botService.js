const userState = require("../data/state").userState;
const users = require("../data/data").users;
const { handlePhoneInput, handleCityInput, handleNameInput } = require('../function');

require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  if (users[chatId]) {
    bot.sendMessage(
      chatId,
      "Ви вже використовували нашого бота. Для перегляду замовлень скористайтеся командою /orders."
    );
  } else {
    bot.sendMessage(
      chatId,
      "Вітаємо в нашому боті! Ми - компанія 'Evergreen'. Для детальної інформації відвідайте наш сайт: https://evergreens.com.ua/ua/."
    );
    users[chatId] = { firstInteraction: true };
  }
});

bot.onText(/\/orders/, (msg) => {
  const chatId = msg.chat.id;

  userState[chatId] = "awaiting_phone";
  bot.sendMessage(
    chatId,
    "Введіть ваш номер телефону, який ви використовували при замовленні. (Наприклад: +1234567890)"
  );
});

const handleMessage = (chatId, text) => {
  if (text !== "/start" && text !== "/orders") {
    switch (userState[chatId]) {
      case "awaiting_phone":
        handlePhoneInput(chatId, text, bot);
        break;
      case "awaiting_name":
        handleNameInput(chatId, text, bot);
        break;
      case "awaiting_city":
        handleCityInput(chatId, text, bot);
        break;
      default:
        bot.sendMessage(
          chatId,
          "Будь ласка, скористайтеся командою /orders для початку."
        );
        break;
    }
  }
};

bot.on("message", (msg) => {
  handleMessage(msg.chat.id, msg.text);
});

bot.onText(/\/operator/, (msg) => {
  const chatId = msg.chat.id;

  axios
    .post("https://somelink.com/operator", {
      chatId: chatId,
      user: users[chatId],
    })
    .then((response) => {
      bot.sendMessage(chatId, "Зачекайте, ми підберемо Вам оператора.");
    })
    .catch((error) => {
      bot.sendMessage(
        chatId,
        "Виникла помилка при зв'язку з оператором. Спробуйте пізніше."
      );

      console.error(error);
    });
});

exports.processMessage = (message) => {
  handleMessage(message.chat.id, message.text);
};
