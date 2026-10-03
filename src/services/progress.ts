import type {WorksheetResult} from '../types';
export const day=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export function stats(results:WorksheetResult[]){const q=results.flatMap(r=>r.results);return {total:q.length,accuracy:q.length?Math.round(q.filter(r=>r.firstCorrect).length/q.length*100):0,average:q.length?Math.round(q.reduce((s,r)=>s+r.timeSpent,0)/q.length):0,today:results.filter(r=>day(new Date(r.completedAt))===day()).reduce((s,r)=>s+r.results.length,0)};}
export const duration=(seconds:number)=>`${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
