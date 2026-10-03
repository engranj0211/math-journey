export type MathSkill = 'addition' | 'subtraction';
export interface MathLevel {id:string; name:string; max:number; targetSeconds:number}
export interface ChildProfile {id:string;name:string;age:number;grade:string;currentLevel:string;dailyGoal:number;targetMinutes:number;createdAt:string}
export interface Question {id:string;skill:MathSkill;a:number;b:number;answer:number}
export interface QuestionResult {question:Question;firstAnswer:number;attempts:number;firstCorrect:boolean;questionStartTime:number;questionEndTime:number;timeSpent:number}
export interface Worksheet {id:string;childId:string;level:string;questions:Question[];results:QuestionResult[];startedAt:number;questionStartTime:number;attempts:number;firstAnswer:number|null;correct:boolean;mode:'addition'|'subtraction'|'mixed'}
export interface WorksheetResult {id:string;childId:string;level:string;completedAt:string;results:QuestionResult[];accuracy:number;worksheetTime:number}
export interface DailyProgress {date:string;questions:number;seconds:number;accuracy:number}
export interface Reward {id:string;name:string;stars:number}
export interface ParentSettings {visibleTimer:boolean;worksheetSize:number}
export interface AppSettings {version:1;children:ChildProfile[];results:WorksheetResult[];active:Worksheet|null;settings:ParentSettings;pin:{salt:string;hash:string}|null}
export interface StorageService {load():AppSettings;save(data:AppSettings):void}
