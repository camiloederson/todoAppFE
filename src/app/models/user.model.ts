import { Task } from "./task.model";

export interface User{
    id: number;
    username: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
    tasks? : Task[];
}