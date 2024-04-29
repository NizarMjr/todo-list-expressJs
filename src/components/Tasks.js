import React, { useEffect, useState } from "react";
import Task from "./Task";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const req = await fetch('http://localhost:3000/');
                const res = await req.json();
                setTasks(res);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataFromApi()
    }, [tasks])

    const clearAllTasks = () => {
        const fetchClear = async () => {
            try {
                const response = await fetch('http://localhost:3000/clear', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'clear' }),
                })
                const data = await response.json();
                console.log('Server response:', data);

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }
        fetchClear();
    }

    return (
        <main>
            {tasks?.map((task, index) => {
                return (
                    <Task task={task} key={index} />
                )
            })}
            <button onClick={() => clearAllTasks()}>Clear All</button>
        </main>
    )
}
export default Tasks;