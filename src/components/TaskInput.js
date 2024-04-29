import React, { useEffect, useRef, useState } from "react";

const TaskInput = () => {
    const [value, setValue] = useState('');
    const [submit, setSubmit] = useState(false);
    const valueRef = useRef();

    useEffect(() => {
        const postNewTask = async () => {
            try {
                const response = await fetch('http://localhost:3000/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ task: value })
                })
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                console.log('Server response:', data);
            }

            catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }
        if (submit) {
            postNewTask();
            setSubmit(false);
        }
    }, [submit])

    const addTask = (e) => {
        setSubmit(true);
        setValue(value);
        valueRef.current.value = '';
    }
    return (
        <form>
            <input ref={valueRef} type="text" placeholder="add task" value={value} onChange={(e) => setValue(e.target.value)} />
            <button onClick={(e) => addTask(e)}>add task</button>
        </form>
    )
}
export default TaskInput;