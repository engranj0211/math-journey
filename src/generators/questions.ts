import type {MathSkill,Question,Worksheet} from '../types';
import {getLevel} from '../data/levels';
export function generateWorksheet(level:string,count:number,mode:Worksheet['mode']):Question[]{
 const max=getLevel(level).max;
 const pool:Omit<Question,'id'>[]=[];
 for(let a=0;a<=max;a++)for(let b=0;b<=max;b++){
  if(mode!=='subtraction'&&a+b<=max)pool.push({skill:'addition',a,b,answer:a+b});
  if(mode!=='addition'&&a>=b)pool.push({skill:'subtraction',a,b,answer:a-b});
 }
 if(count>pool.length||count<1)throw new Error('Invalid worksheet size');
 for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
 return pool.slice(0,count).map(q=>({...q,id:crypto.randomUUID()}));
}
export const symbol=(skill:MathSkill)=>skill==='addition'?'+':'−';
