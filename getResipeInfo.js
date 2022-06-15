import * as cheerio from 'cheerio';
import needle from 'needle';

export async function getRecipe(link) {
    console.log(link);
    return needle('get', link)
    .then(function(response) {
        const info = {};
        const descriptions = [];
        const ingredients = [];
        const $ = cheerio.load(response.body);
        const title = $('h1[class="title "]').text();
        const imgInfoAdditional = $('.main_image > tbody > tr > td > a').attr('href');

        $('.ingr').find('tbody > tr').each((index, element) => {
            const desc = ($(element).find('td > span').text());
            ingredients.push(desc);
        })
        info.title = title;
        info.imgInfo = 'https:' + imgInfoAdditional;
        info.ings = ingredients;
        $('.step_images_n').find('.step_n').each((index, element) => {
            const desc = ($(element).find('p').text());
            descriptions.push(desc);
        })

        if (!descriptions.length) {
            descriptions.push($('#how').find('p').text());
        }

        info.desc = descriptions;

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
        await ctx.replyWithHTML(steps.join(',').replace(/,/g, '\n'))
    ]);
}
