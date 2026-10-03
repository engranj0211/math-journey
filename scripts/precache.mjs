import {readdir,readFile,writeFile} from 'node:fs/promises';
const assets=await readdir(new URL('../dist/assets/',import.meta.url));
const path=new URL('../dist/sw.js',import.meta.url);let code=await readFile(path,'utf8');code=code.replace("['./','./index.html']",JSON.stringify(['./','./index.html',...assets.map(a=>'./assets/'+a)]));await writeFile(path,code);
