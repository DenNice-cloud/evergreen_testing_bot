const { users } = require("../data/data");
const { userState } = require("../data/state");

function handleCityInput(chatId, text, bot) {
  const phone = userState[chatId + "_phone"];
  const name = userState[chatId + "_name"];
  const city = text;

  const userId = generateUserId();
  users[userId] = {
    id: userId,
    phone: phone,
    name: name,
    city: city,
    products: [],
  };

  bot.sendMessage(
    chatId,
    "Користувача зареєстровано. Ви можете зв'язатися з оператором, надіславши команду /operator."
  );
  
  delete userState[chatId];
  delete userState[chatId + "_phone"];
  delete userState[chatId + "_name"];
}

function generateUserId() {
  return Object.keys(users).length + 1;
}

module.exports = handleCityInput;
