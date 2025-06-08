import React, { useContext } from 'react';
import Task from './Task';
import TaskContext from './TaskContext';

const Tasks = () => {
    const { tasks, fetchTasks } = useContext(TaskContext);

    const clearAllTasks = async () => {
        try {
            const res = await fetch('http://localhost:3000/clear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'clear' }),
            });
            if (!res.ok) throw new Error('Failed to clear tasks');
            await res.json();
            fetchTasks();
        } catch (err) {
            console.error('Failed to clear tasks', err);
        }
    };

    return (
        <div>
            {tasks.length === 0 && <p>No tasks yet.</p>}
            {tasks.map((task, index) => (
                <Task key={index} task={task} />
            ))}
            {tasks.length > 0 && (
                <button onClick={clearAllTasks} style={{ marginTop: '1rem' }}>
                    Clear All
                </button>
            )}
        </div>
    );
};

export default Tasks;
