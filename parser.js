const cliProgress = require('cli-progress');
const fsPromises = require('fs/promises');
const axios = require('axios').default;
const cheerio = require('cheerio');
const fs = require('fs');

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

async function scraper(pathNumber, name, filePath, count) {
    const linksList = [];
    bar.start(count, 0);
    for (let i = 1; i <= count; i++) {
        console.log(`\nProgress, ${name}`);
        await axios.get(`https://www.russianfood.com/recipes/bytype/?fid=${pathNumber}&page=${i}#rcp_list`)
        .then(function (response) {
            const $ = cheerio.load(response.data);
            $('div[class="recipe_list_new"]').find('.foto > a').each(function (index, element) {
                const link = ($(element).attr('href'));
                linksList.push('https://www.russianfood.com' + link);
                bar.update(i);
            });
        })

        .catch(function (error) {
            console.log(error);
        })
    }

    await checkFileExists(filePath)

    await writeLinks(filePath, JSON.stringify(linksList), name);
}

async function writeLinks(filename, content, name) {
    try {
      await fsPromises.writeFile(filename, content);
      bar.stop();
    } catch (err) {
      console.error(err);
    }
}

async function checkFileExists(file) {
    try {
        await fs.promises.access(file, fs.constants.F_OK);
        return fs.unlinkSync(filePath);
    } catch {
        return false;
    }
  }


Promise.all([scraper(3, 'second', 'second.txt', 30), scraper(2, 'first', 'first.txt', 30)]);
