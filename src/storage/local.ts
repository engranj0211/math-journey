import type {AppSettings,StorageService} from '../types';
const key='math-journey.v1';
export const initial=():AppSettings=>({version:1,children:[],results:[],active:null,settings:{visibleTimer:true,worksheetSize:20},pin:null});
export const storage:StorageService={load(){const raw=localStorage.getItem(key);if(!raw)return initial();const data=JSON.parse(raw);if(data.version!==1||!Array.isArray(data.children)||!Array.isArray(data.results)||!data.settings)throw new Error('Saved data could not be read. Keep your browser data and contact support.');return data;},save(data){localStorage.setItem(key,JSON.stringify(data));}};
export async function hashPin(pin:string,salt:string){const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+pin));return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');}
