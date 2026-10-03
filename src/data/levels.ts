import type {MathLevel} from '../types';
export const levels:MathLevel[]=[{id:'1',name:'Within 10',max:10,targetSeconds:20},{id:'2',name:'Within 20',max:20,targetSeconds:20},{id:'3',name:'Within 50',max:50,targetSeconds:30},{id:'4',name:'Within 100',max:100,targetSeconds:40}];
export const getLevel=(id:string)=>levels.find(l=>l.id===id)??levels[0];
