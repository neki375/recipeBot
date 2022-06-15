import {botStart} from './tgBot.js';
import {Telegraf} from 'telegraf';
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_TOKEN)

await botStart(bot);


