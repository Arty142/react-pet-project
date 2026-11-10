import { useState } from "react";
import {Link, Outlet } from "react-router-dom";

import { Card } from "../../components/Card/Card";
import { tasksApi } from "../../api/tasksApi";

import type { Task } from "../../types/tasks";

function EventsPage() {
        const [tasks, setTasks] = useState<Task[]>([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);

        const loadTasks = async () => {
                try {
                        setLoading(true);
                        setError(null);

                        const data = await tasksApi.getTasks();

                        setTasks(data);
                } catch (error) {
                        setError("Failed to load tasks");
                } finally {
                        setLoading(false);
                }
        };

        return (
                <>
                        <Card>
                                <Card.Header>
                                        Tasks Dashboard
                                </Card.Header>

                                <Card.Body>
                                        <h3>{tasks.length}</h3>
                                        <p>Total tasks</p>

                                        <button
                                                onClick={loadTasks}
                                                disabled={loading}
                                        >
                                                {loading ? "Loading..." : "Load tasks"}
                                        </button>

                                        {error && <p>{error}</p>}
                                </Card.Body>

                                <Card.Footer>
                                        <Link to="/dashboard">
                                                View dashboard
                                        </Link>
                                </Card.Footer>
                        </Card>

                        {loading && <p>Loading tasks...</p>}

                        {!loading && tasks.length > 0 && (
                                <div className="tasks-list">
                                        {tasks.map(task => (
                                                <Card key={task.id}>
                                                        <Card.Header>
                                                                {task.title}
                                                        </Card.Header>

                                                        <Card.Body>
                                                                <p>{task.description}</p>
                                                                <p>Priority: {task.priority}</p>
                                                                <p>Status: {task.status}</p>
                                                                <p>Assignee: {task.assignee}</p>
                                                        </Card.Body>

                                                        <Card.Footer>
                                                                Due: {task.dueDate}
                                                        </Card.Footer>
                                                </Card>
                                        ))}
                                </div>
                        )}

                        <Outlet />
                </>
        );
}

export default EventsPage;
