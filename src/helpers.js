import fss from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fs = fss.promises;

async function getFile(startDir, filename) {
    const source = path.join(startDir, filename);
    if (await fsCheck(source)) {
        return await fs.readFile(source)
    } else {
        const dirs = (await fs.readdir(startDir)).filter(name => !name.match(/\./));
        for (let dir of dirs) {
            const res = await getFile(path.join(startDir, dir), filename);
            if (res) return res;
        }
    }
}

async function fsCheck (accespath) {
    try {
        await fs.access(accespath)
        return true;
    } catch(err) {
        return false;
    }
}
export {
    getFile,
    __dirname
}