"use strict";
exports.__esModule = true;
var Bot_1 = require("./src/Bot");
require("dotenv/config");
var bot = new Bot_1.Bot(process.env.BOT_TOKEN);
bot.start();
