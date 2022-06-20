import fsPromises from 'fs/promises';
import fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

async function scraper(category) {
    const linksList = [];
    for (let i = 0; i <= 500; i++) {
        console.log(i);
        await axios.get(`https://eda.ru/recepty/${category}?page=${i}`)
        .then(function (response) {
            const $ = cheerio.load(response.data);
            $('.emotion-7ote3x > div').find('.emotion-m0u77r').each((index, e) => {
                const data = $(e).find('.emotion-m0u77r > .emotion-1f6ych6 > .emotion-4o0liq > a');
                const link = 'https://eda.ru' + data.attr('href');
                const img = $(data).find('.emotion-0 > .emotion-mrkurn > img').attr('src');
                if (img && !img.match(/data:image/g)) {
                    linksList.push({
                        link,
                        img
                    })
                }
            });
            
        })

        .catch(function (error) {
            console.log(error);
        })
    }

    await checkFileExists('breakfast.txt');
    // fs.appendFile('soups.txt', JSON.stringify(linksList), function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    //   });
    await writeLinks('breakfast.txt', JSON.stringify(linksList));
   
}

async function writeLinks(filename, content) {
    try {
      await fsPromises.writeFile(filename, content);
    //   bar.stop();
    } catch (err) {
      console.error(err);
    }
}

async function checkFileExists(file) {
    try {
        await fs.promises.access(file, fs.constants.F_OK);
        return fs.unlinkSync(file);
    } catch {
        return false;
    }
  }

scraper('supy');
//osnovnye-blyuda
//salaty


