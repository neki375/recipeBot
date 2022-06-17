import * as cheerio from 'cheerio';
import needle from 'needle';

export async function getRecipeDesc(link, img) {
    console.log(link);
    return needle('get', link)
    .then(function(response) {
        const info = {};
        const ingredients = [];
        const descriptions = [];

        const $ = cheerio.load(response.body);
        info.img = img;

        const title = $('.emotion-gl52ge').text();
        const portions = $('.emotion-1047m5l').text();

        $('.emotion-13pa6yw').find('.emotion-7yevpr').each((index, element) => {
            const name = ($(element).find('.emotion-ydhjlb > .emotion-bjn8wh > span').text());
            const count = ($(element).find('.emotion-ydhjlb > .emotion-15im4d2').text());
            ingredients.push(name + '-' + count.replace(/,/g, ''));
        });

        info.title = title;
        info.portions = portions;
        info.ings = ingredients;

        $('.emotion-1ywwzp6').find('.emotion-122mebg').each((index, element) => {
            const count = ($(element).find('.emotion-bzb65q').text());
            const desc = ($(element).find('.emotion-6kiu05').text());
            descriptions.push(`${count}.` + ' ' + desc.replace(/,/g, ''));
     
        });
        
        if (!descriptions.length) {
            $('.emotion-1ywwzp6').find('.emotion-19fjypw').each((index, element) => {
                const count = ($(element).find('.emotion-bzb65q').text());
                const desc = ($(element).find('.emotion-6kiu05').text());
                descriptions.push(`${count}.` + ' ' + desc.replace(/,/g, ''));
         
            });
        }
        
        info.desc = descriptions.join(',').replace(/,/g, ';').split();

        return info;
    })
    .catch(function(err) {
        console.log(err);
    })
}

export async function resipeView(ctx, title, img, ings, steps) {
    return Promise.all([
        await ctx.replyWithPhoto({url: img}, {caption: title}),
        await ctx.replyWithHTML(ings.join(',').replace(/,/g, '\n')),
        await ctx.replyWithHTML(steps.join(',').replace(/;/g, '\n'))
    ]);
}
