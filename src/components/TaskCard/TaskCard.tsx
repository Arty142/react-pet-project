import type { Task } from '../../types/tasks.ts';

interface TaskCardProps {
        task: Task;
        onClick?: (task: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
        return (
                <div className="task-card" onClick={() => onClick?.(task)}>
                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <div>
                                <span>Priority: {task.priority}</span>
                                <span>Status: {task.status}</span>
                        </div>

                        <div>
                                <span>Assignee: {task.assignee}</span>
                                <span>Due: {task.dueDate}</span>
                        </div>
                </div>
        );
}
