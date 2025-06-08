import React, { useContext, useEffect, useRef, useState } from "react";
import TaskContext from "./TaskContext";

const Task = ({ task }) => {
    const [toggleEdit, setToggleEdit] = useState(false);
    const [edit, setEdit] = useState('');
    const editValue = useRef()
    const { fetchTasks } = useContext(TaskContext);

    useEffect(() => {
        if (toggleEdit && editValue.current) {
            setEdit(editValue.current.value);
            editValue.current.focus();
        }
    }, [toggleEdit])

    const deleteTask = (task) => {
        const fetchDelete = async () => {
            try {
                const response = await fetch('http://localhost:3000', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ task: task })
                })
                if (!response.ok) {
                    console.error("Status code:", response.status);
                    throw new Error('Network Problem');
                }

                const data = await response.json();
                console.log(data);

            } catch (err) {
                console.log('Cannot fetch and delete task', err);
            }
            fetchTasks();
        }
        fetchDelete();
    }
    const editTask = () => {
        setToggleEdit(true);
    }

    const confirmEdit = (task, edit) => {
        const fetchEdit = async () => {
            const response = await fetch('http://localhost:3000', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: task, edit: edit })
            })
            if (!response.ok) throw new Error("Problem status ", response.status);
            const data = await response.json();
            fetchTasks();
        }
        if (task !== edit && edit.trim() !== '')
            fetchEdit();
        setToggleEdit(false);
    }
    return (
        <div>
            <p>{task}</p>
            {toggleEdit && <input ref={editValue} type="text" defaultValue={task} onChange={(e) => setEdit(e.target.value)} />}
            <div>
                <button onClick={() => deleteTask(task)}>delete</button>
                {!toggleEdit ? <button onClick={editTask}>edit</button> :
                    <button onClick={() => confirmEdit(task, edit)}>Confirm</button>}
            </div>
        </div>
    )
}
export default Task;