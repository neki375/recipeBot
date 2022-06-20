import * as cheerio from 'cheerio';
import needle = require('needle');


export interface Iinfo {
    img: string;
    title: string;
    ings: Array<string>;
    desc: Array<string>;
}

export async function getRecipeInfo(link: string, img: string): Promise<Iinfo> {
    console.log(link); 
    const info: Iinfo = {
        img: '',
        title: '',
        ings: [],
        desc: []
    };
    const res = await getData(link);
    const $ = cheerio.load(res);

    info.img = img;
    info.title = $('.emotion-gl52ge').text() + ' порции' + '-' + $('.emotion-1047m5l').text();

    $('.emotion-13pa6yw').find('.emotion-7yevpr').each((_index: number, element: cheerio.Element) => {
        const name = ($(element).find('.emotion-ydhjlb > .emotion-bjn8wh > span').text());
        const count = ($(element).find('.emotion-ydhjlb > .emotion-15im4d2').text());
        info.ings.push(name + '-' + count.replace(/,/g, ''));
    });

    await getDescription($, info, '122mebg');
    
    if (!info.desc.length) {
        await getDescription($, info, '19fjypw');
    }
    
    info.desc = info.desc.join(',').replace(/,/g, ';').split(';');

    return info;
}

async function getDescription($: cheerio.CheerioAPI, info: Iinfo, tag: string): Promise<void> {
    $('.emotion-1ywwzp6').find(`.emotion-${tag}`).each((_index: number, element: cheerio.Element) => {
        const count = ($(element).find('.emotion-bzb65q').text());
        const desc = ($(element).find('.emotion-6kiu05').text());
        info.desc.push(`${count}.` + ' ' + desc.replace(/,/g, ''));
    });
}

async function getData(link: string): Promise<any>  {
    return await needle('get', link)
    .then((response: any) => {
        return response.body;
    })
    .catch(function(err) {
        console.error(err);
    });
} 
