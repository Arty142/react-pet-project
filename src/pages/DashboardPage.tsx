import { TaskCard } from '../components/TaskCard/TaskCard';
import type { Task } from '../types/tasks.ts';

const tasks: Task[] = [
        {
                id: 1,
                title: 'Implement authentication',
                description: 'Add login and registration',
                priority: 'high',
                status: 'in-progress',
                assignee: 'Artem',
                dueDate: '2026-11-15',
        },
        {
                id: 2,
                title: 'Create dashboard',
                description: 'Implement dashboard layout',
                priority: 'medium',
                status: 'todo',
                assignee: 'Alex',
                dueDate: '2026-11-20',
        },
];

export function DashboardPage() {
        const handleTaskClick = (task: Task) => {
                console.log('Selected task:', task);
        };

        return (
                <div>
                        <h1>Dashboard</h1>

                        {tasks.map(task => (
                                <TaskCard
                                        key={task.id}
                                        task={task}
                                        onClick={handleTaskClick}
                                />
                        ))}
                </div>
        );
}

export default DashboardPage;
