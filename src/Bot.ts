import {Context, Telegraf} from 'telegraf';
import {readFile} from './data/Reader';
import {Update} from 'typegram';
import {getRecipeInfo, Iinfo} from './parsers/getRecipeInfo';

export class Bot {
  private readonly bot: Telegraf<Context<Update>>;
  constructor(token: string) {
    this.bot = new Telegraf(token as string);
  }

  async start() {
    console.log('Start bot');
    this.bot.start(async (ctx) => {
      const firstDishes = await readFile('./files/soups.txt');
      const secondDishes = await readFile('./files/secondDish.txt');
      const salads = await readFile('./files/salats.txt');

      ctx.replyWithHTML('Ищу..');

      const firstDish = await getRecipeInfo(firstDishes.link, firstDishes.img);
      const secondDish = await getRecipeInfo(secondDishes.link, secondDishes.img);
      const salat = await getRecipeInfo(salads.link, salads.img);
  
      Promise.all([
          await this.resipeView(ctx, firstDish),
          await this.resipeView(ctx, secondDish),
          await this.resipeView(ctx, salat)
      ]);
    });
  
    this.bot.on('message', (ctx) => ctx.reply('Для получения рецептов напишите /start'));

    this.bot.launch();
  }


  private async resipeView(ctx: any, info: Iinfo): Promise<[any, any, any]> {
    return Promise.all([
        await ctx.replyWithPhoto({url: info.img}, {caption: info.title}),
        await ctx.replyWithHTML(info.ings.join(',').replace(/,/g, '\n')),
        await ctx.replyWithHTML(info.desc.join(',').replace(/,/g, '\n'))
    ]);
}
}