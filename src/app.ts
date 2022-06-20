import {Bot} from './Bot';
import 'dotenv/config'

const bot = new Bot(process.env.BOT_TOKEN as string);

bot.start();


