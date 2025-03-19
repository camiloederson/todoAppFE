import { User } from "./user.model";
import { TaskStatus } from "./taskStatus.model";

export interface Task {
    id?: number;
    user: User;
    title: string;
    description?: string;
    dueDate: string;
    status: TaskStatus;
    createdAt?: string;
    updatedAt?: string;
}