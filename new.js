// const cliProgress = require('cli-progress');
// const fsPromises = require('fs/promises');
// const axios = require('axios').default;
import fsPromises from 'fs/promises';
import fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

async function scraper() {
    // breakfast = 130
    // osnovnye-blyuda
    const linksList = [];
    for (let i = 1; i <= 5; i++) {
        console.log(i);
        await axios.get(`https://eda.ru/recepty/zavtraki?page=${i}`)
        .then(function (response) {
            const $ = cheerio.load(response.data);
            $('.emotion-7ote3x > div').find('.emotion-m0u77r').each((index, e) => {
                const data = $(e).find('.emotion-m0u77r > .emotion-1f6ych6 > .emotion-4o0liq > a');
                const link = 'https://eda.ru/' + data.attr('href');
                const img = $(data).find('.emotion-0 > .emotion-mrkurn > img').attr('src');
                if (img.match(/src/g)) {
                    linksList.push({
                        link,
                        img
                    })
                }
            });

            // console.log(linksList);
            
        })

        .catch(function (error) {
            console.log(error);
        })
    }

    await checkFileExists('breakfast.txt');

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

scraper();


