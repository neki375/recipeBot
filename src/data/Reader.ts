import * as fs from 'fs';

export async function readFile(filePath: string) {
    try {
      const data = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));

      return data[Math.floor(Math.random()*data.length)];
    }
    catch(err) {
      console.log(err)
    }
}
