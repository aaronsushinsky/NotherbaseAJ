import NotherBaseFS from "notherbase-fs";
import { fileURLToPath } from 'node:url';
const __dirname = fileURLToPath(new URL('./world', import.meta.url));

import nkjvBible from "./globals/NKJV.js";

const notherBaseFS = new NotherBaseFS(__dirname, { nkjvBible });