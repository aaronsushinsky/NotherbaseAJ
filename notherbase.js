import NotherBaseFS from "notherbase-fs";
import { fileURLToPath } from 'node:url';
const __dirname = fileURLToPath(new URL('./world', import.meta.url));

const notherBaseFS = new NotherBaseFS(__dirname);