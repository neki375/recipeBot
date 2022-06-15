import fs from 'fs';
import {getRecipe, resipeView} from './getResipeInfo.js';

export async function botStart(bot) {
    bot.start(async (ctx) => {
        const firstDishes = JSON.parse(fs.readFileSync('first.txt', 'utf8'));
        const randomFirstDish = firstDishes[Math.floor(Math.random()*firstDishes.length)];
    
        const secondDishes = JSON.parse(fs.readFileSync('second.txt', 'utf8'));
        const randomSecondDish = secondDishes[Math.floor(Math.random()*secondDishes.length)];

        ctx.replyWithHTML('Ищу..');

        const infoFirstDish = await getRecipe(randomFirstDish);
        const infoSecondtDish = await getRecipe(randomSecondDish);
    
        Promise.all([
            await resipeView(ctx, infoFirstDish.title, infoFirstDish.imgInfo, infoFirstDish.ings, infoFirstDish.desc),
            await resipeView(ctx, infoSecondtDish.title, infoSecondtDish.imgInfo, infoSecondtDish.ings, infoSecondtDish.desc)
        ])
    });
    
    bot.on('message', (ctx) => ctx.reply('Для получения рецептов напишите /start'));

    bot.launch();
}
