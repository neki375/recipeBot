const cliProgress = require('cli-progress');
const fsPromises = require('fs/promises');
const axios = require('axios').default;
const cheerio = require('cheerio');
const fs = require('fs');

const multibar = new cliProgress.MultiBar({
    clearOnComplete: false,
    hideCursor: true

}, cliProgress.Presets.shades_classic);

async function scraper(pathNumber, name, filePath, count) {
    const linksList = [];
    const processBar = multibar.create(count, 0);
    console.log(`\nProgress ${filePath}`);
    for (let i = 1; i <= count; i++) {
        await axios.get(`https://www.russianfood.com/recipes/bytype/?fid=${pathNumber}&page=${i}#rcp_list`)
        .then(function (response) {
            const $ = cheerio.load(response.data);
            $('div[class="recipe_list_new"]').find('div > div > a').each(function (index, element) {
                const link = ($(element).attr('href'));
                if (!link.match(/sort/)) {
                    linksList.push(link);
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            processBar.update(i)
        });
    }
    const filterList = linksList.filter((i, pos) => linksList.indexOf(i) === pos)
        .map((i) => 'https://www.russianfood.com' + i)

    await checkFileExists(filePath)

    writeLinks(filePath, JSON.stringify(filterList), name);
    processBar.stop()
}

async function writeLinks(filename, content, name) {
    try {
      await fsPromises.appendFile(filename, content);
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

scraper(3, 'second', 'second.txt', 30);
scraper(2, 'first', 'first.txt', 30);
