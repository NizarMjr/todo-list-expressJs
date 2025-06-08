import React, { useContext, useRef, useState } from "react";
import TaskContext from "./TaskContext";

const TaskInput = () => {
    const [value, setValue] = useState('');
    const valueRef = useRef();
    const { fetchTasks } = useContext(TaskContext);

    const postNewTask = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: value })
            })
            if (!res.ok) throw new Error('Problem Network');
            const data = await res.json();
            console.log('Server Response : ', data);

        } catch (err) {
            console.log('There is Problem in fetching', err);
        }
        valueRef.current.value = '';
        fetchTasks();
    }

    return (
        <form>
            <input ref={valueRef} type="text" placeholder="add task" value={value} onChange={(e) => setValue(e.target.value)} />
            <button onClick={postNewTask}>add task</button>
        </form>
    )
}
export default TaskInput;