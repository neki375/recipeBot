import fs from 'fs';
import {getRecipeDesc, resipeView} from './parsers/getRecipeDescription.js';

export async function botStart(bot) {
    bot.start(async (ctx) => {
        console.log(ctx.message.chat.first_name);
        const firstDishes = await readFile('./infoFiles/soups.txt');
        const secondDishes = await readFile('./infoFiles/secondDish.txt');
        const salads = await readFile('./infoFiles/salats.txt');

        ctx.replyWithHTML('Ищу..');

        const infoFirstDish = await getRecipeDesc(firstDishes.link, firstDishes.img);
        const infoSecondtDish = await getRecipeDesc(secondDishes.link, secondDishes.img);
        const salatInfo = await getRecipeDesc(salads.link, salads.img);
    
        Promise.all([
            await resipeView(ctx, infoFirstDish.title, infoFirstDish.img, infoFirstDish.ings, infoFirstDish.desc),
            await resipeView(ctx, salatInfo.title, salatInfo.img, salatInfo.ings, salatInfo.desc),
            await resipeView(ctx, infoSecondtDish.title, infoSecondtDish.img, infoSecondtDish.ings, infoSecondtDish.desc)
        ])
    });
    
    bot.on('message', (ctx) => ctx.reply('Для получения рецептов напишите /start'));

    bot.launch();
}


const readFile = async filePath => {
    try {
      const data = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
      return data[[Math.floor(Math.random()*data.length)]];
    }
    catch(err) {
      console.log(err)
    }
  }