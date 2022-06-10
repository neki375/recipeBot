const {Telegraf, Markup} = require('telegraf');
const fs = require('fs');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    const firstDishes = JSON.parse(fs.readFileSync('first.txt', 'utf8'));
    const randomFirstDish = firstDishes[Math.floor(Math.random()*firstDishes.length)];
    const secondDishes = JSON.parse(fs.readFileSync('second.txt', 'utf8'));
    const randomSecondDish = secondDishes[Math.floor(Math.random()*secondDishes.length)];
    ctx.reply(`Вот те суп нах: ${randomFirstDish}\nВот те второе бля: ${randomSecondDish}\n`)
});
bot.on('message', (ctx) => ctx.reply('Ну напиши ты бля /start'));

bot.launch();
