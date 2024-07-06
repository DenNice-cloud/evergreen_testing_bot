const { users } = require("../data/data");
const { userState } = require("../data/state");

function handlePhoneInput(chatId, text, bot) {
  if (/^\+?[0-9]{10,15}$/.test(text)) {
    let foundUser = null;

    for (let userId in users) {
      if (users[userId].phone === text) {
        foundUser = users[userId];
        break;
      }
    }

    if (foundUser) {
      sendUserInfo(chatId, foundUser, bot);
    } else {
      bot.sendMessage(
        chatId,
        "Користувача з таким номером телефону не знайдено. Будь ласка, введіть Ваше ім'я."
      );
      userState[chatId] = "awaiting_name";
      userState[chatId + "_phone"] = text;
    }
  } else {
    bot.sendMessage(chatId, "Будь ласка, введіть дійсний номер телефону.");
  }
}

function sendUserInfo(chatId, user, bot) {
  let reply = `Інформація про користувача:\nІм'я: ${user.name}\nМісто: ${user.city}\n`;

  if (user.products.length > 0) {
    reply += `Продукти:\n`;
    user.products.forEach((product) => {
      reply += `${product.product_name}, Статус: ${product.status}\n`;
    });
  } else {
    reply += `Користувач не має замовлень.\n`;
  }

  bot.sendMessage(chatId, reply);
}

module.exports = handlePhoneInput;
