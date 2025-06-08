const express = require('express')
const app = express()
const cors = require('cors');


app.use(express.json());

app.use(cors());

const port = 3000;

app.listen(port, () => {
    console.log(`connecting to port ${port}`);
})

var tasks = [];

app.get('/', (req, res) => {
    res.status(200).json(tasks)
})

app.post('/', (req, res) => {
    const { task } = req.body;
    if (task.length === 0)
        res.status(201).json({ message: 'Empty Task ' });

    if (task.trim() !== '' && !tasks.find(t => t === task))
        tasks.push(task);
    res.status(201).json({ message: 'Task recieved successfully' });
})

app.post('/clear', (req, res) => {
    tasks.length = 0;
    res.status(201).json({ 'message': 'Clear data' })
})

app.delete('/', (req, res) => {
    const { task } = req.body;
    tasks = tasks.filter((t) => t !== task)
    res.status(201).json({ message: "task deleted" });
})

app.put('/', (req, res) => {
    const { task, edit } = req.body;
    const newTasks = tasks.map(t => t === task ? edit : t)
    tasks = newTasks;
    res.status(201).json({ message: "Task updated successfuly" });
})