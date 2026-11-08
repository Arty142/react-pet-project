export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
        id: number;
        title: string;
        description: string;
        priority: TaskPriority;
        status: TaskStatus;
        assignee: string;
        dueDate: string;
}
