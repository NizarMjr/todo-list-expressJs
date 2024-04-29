import React, { useEffect, useState } from "react";

const Task = ({ task }) => {
    const [toggleEdit, setToggleEdit] = useState(false);
    const [edit, setEdit] = useState('');

    const deleteTask = (task) => {
        const fetchDelete = async () => {
            try {
                const response = await fetch('http://localhost:3000/', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ task: task })
                })
                const data = await response.text();
                console.log('Server response:', data);

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }
        fetchDelete();
    }
    const editTask = () => {
        setToggleEdit(true);
    }

    const confirmEdit = (task, edit) => {
        const fetchEdit = async () => {
            try {
                const response = await fetch('http://localhost:3000/', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ task: task, edit: edit })
                })
                const data = await response.json();
                console.log('Server response:', data);
            }
            catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }
        fetchEdit();
        setToggleEdit(false);
    }
    return (
        <div>
            <p>{task.task}</p>
            {toggleEdit && <input type="text" defaultValue={task.task} onChange={(e) => setEdit(e.target.value)} />}
            <div>
                <button onClick={() => deleteTask(task.task)}>delete</button>
                {!toggleEdit ? <button onClick={() => editTask()}>edit</button> :
                    <button onClick={() => confirmEdit(task.task, edit)}>Confirm</button>}
            </div>
        </div>
    )
}
export default Task;