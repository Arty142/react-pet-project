import type { Task } from "../types/tasks";

const tasks: Task[] = [
        {
                id: 1,
                title: "Learn React",
                description: "Understand components and hooks",
                priority: "high",
                status: "in-progress",
                assignee: "Artem",
                dueDate: "2026-11-12",
        },
        {
                id: 2,
                title: "Learn TypeScript",
                description: "Practice interfaces and types",
                priority: "medium",
                status: "todo",
                assignee: "John",
                dueDate: "2026-11-15",
        },
        {
                id: 3,
                title: "Create dashboard",
                description: "Build a dashboard using React",
                priority: "low",
                status: "done",
                assignee: "Anna",
                dueDate: "2026-11-08",
        },
];

const delay = (ms: number) =>
        new Promise(resolve => setTimeout(resolve, ms));

export const tasksApi = {
        async getTasks(): Promise<Task[]> {
                await delay(1500);

                return [...tasks];
        },
};
