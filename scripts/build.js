import * as fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const removeDirectoryRecursive = (dirPath) => {
    if (!fs.existsSync(dirPath)) return;

    fs.readdirSync(dirPath).forEach((file) => {
        const curPath = path.join(dirPath, file);
        if (fs.lstatSync(curPath).isDirectory()) removeDirectoryRecursive(curPath);
        else fs.unlinkSync(curPath);
    });

    fs.rmdirSync(dirPath);
};

const distDirectory = path.join(__dirname, '..', 'dist');

removeDirectoryRecursive(distDirectory);

exec('tsc', (error, stdout, stderr) => {
    if (error) console.error(`[Build]`, `Error during TypeScript compilation:`, error);
    else console.log(`[Build]`, `TypeScript compilation successful.`);

    if (error) process.exit(1);
});