const { userState } = require("../data/state");

function handleNameInput(chatId, text, bot) {
  userState[chatId + "_name"] = text;
  bot.sendMessage(chatId, "Будь ласка, введіть Ваше місто.");
  userState[chatId] = "awaiting_city";
}

module.exports = handleNameInput;
