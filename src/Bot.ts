import {Context, Telegraf} from 'telegraf';
import {readFile} from './data/Reader';
import {Update} from 'typegram';
import {getRecipeInfo} from './parsers/getRecipeInfo';

export class Bot {
  private readonly bot: Telegraf<Context<Update>>;
  constructor(token: string) {
    this.bot = new Telegraf(token as string);
  }

  async start() {
    this.bot.start(async (ctx) => {
      const firstDishes = await readFile('./files/soups.txt');
      const secondDishes = await readFile('./files/secondDish.txt');
      const salads = await readFile('./files/salats.txt');

      ctx.replyWithHTML('Ищу..');

      const infoFirstDish = await getRecipeInfo(firstDishes.link, firstDishes.img);
      const infoSecondtDish = await getRecipeInfo(secondDishes.link, secondDishes.img);
      const salatInfo = await getRecipeInfo(salads.link, salads.img);
  
      Promise.all([
          await this.resipeView(ctx, infoFirstDish.title, infoFirstDish.img, infoFirstDish.ings, infoFirstDish.desc),
          await this.resipeView(ctx, salatInfo.title, salatInfo.img, salatInfo.ings, salatInfo.desc),
          await this.resipeView(ctx, infoSecondtDish.title, infoSecondtDish.img, infoSecondtDish.ings, infoSecondtDish.desc)
      ])
    });
  
    this.bot.on('message', (ctx) => ctx.reply('Для получения рецептов напишите /start'));

    this.bot.launch();
  }


  private async resipeView(ctx: any, title: string, img: string, ings: Array<string>, steps: Array<string>): Promise<[any, any, any]> {
    return Promise.all([
        await ctx.replyWithPhoto({url: img}, {caption: title}),
        await ctx.replyWithHTML(ings.join(',').replace(/,/g, '\n')),
        await ctx.replyWithHTML(steps.join(',').replace(/,/g, '\n'))
    ]);
}
}