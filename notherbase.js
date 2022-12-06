import NotherBaseFS from "notherbase-fs";
import { fileURLToPath } from 'node:url';
const __dirname = fileURLToPath(new URL('./', import.meta.url));
console.log(import.meta.url);
console.log(__dirname);

const notherBaseFS = new NotherBaseFS(
    `${__dirname}world/explorer`, 
    `${__dirname}world/explorer/void`, 
    `${__dirname}world/the-front`, 
    `${__dirname}pages`);