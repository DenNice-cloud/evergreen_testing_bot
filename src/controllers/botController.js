const botService = require('../services/botService');

exports.handleWebhook = (req, res) => {
    const message = req.body.message;
    botService.processMessage(message);
    res.status(200).send();
};
