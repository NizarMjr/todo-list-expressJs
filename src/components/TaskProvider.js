import React, { useState, useEffect } from 'react';
import TaskContext from './TaskContext';

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/');
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            console.error('Failed to fetch tasks', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, fetchTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
