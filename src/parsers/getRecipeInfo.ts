import * as cheerio from 'cheerio';
import needle = require('needle');


export interface Iinfo {
    img: string;
    title: string;
    portions: string;
    ings: Array<string>;
    desc: Array<string>;
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


export async function getRecipeInfo(link: string, img: string): Promise<Iinfo> {
    console.log(link); 
    const info: Iinfo = {
        img: '',
        title: '',
        portions: '',
        ings: [],
        desc: []
    };
    const res = await getData(link);

    const $ = cheerio.load(res);
    info.img = img;

    const title = $('.emotion-gl52ge').text();
    const portions = $('.emotion-1047m5l').text();

    $('.emotion-13pa6yw').find('.emotion-7yevpr').each((_index, element) => {
        const name = ($(element).find('.emotion-ydhjlb > .emotion-bjn8wh > span').text());
        const count = ($(element).find('.emotion-ydhjlb > .emotion-15im4d2').text());
        info.ings.push(name + '-' + count.replace(/,/g, ''));
    });

    info.title = title;
    info.portions = portions;

    $('.emotion-1ywwzp6').find('.emotion-122mebg').each((_index, element) => {
        const count = ($(element).find('.emotion-bzb65q').text());
        const desc = ($(element).find('.emotion-6kiu05').text());
        info.desc.push(`${count}.` + ' ' + desc.replace(/,/g, ''));
 
    });
    
    if (!info.desc.length) {
        $('.emotion-1ywwzp6').find('.emotion-19fjypw').each((_index, element) => {
            const count = ($(element).find('.emotion-bzb65q').text());
            const desc = ($(element).find('.emotion-6kiu05').text());
            info.desc.push(`${count}.` + ' ' + desc.replace(/,/g, ''));
     
        });
    }
    
    info.desc = info.desc.join(',').replace(/,/g, ';').split(';');

    return info;

}