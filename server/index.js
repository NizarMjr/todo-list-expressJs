// NOTE : To guarantee the request method POST and DELETE
// are working well run this file on the port 3000
// and the frontend file on the port 3001

const express = require('express')
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

const tasks = [];

app.get('/', (req, res) => {
    res.status(200).send(tasks);
})
const port = 3000;

app.post('/', (req, res) => {
    const task = req.body;
    if (!tasks.find(t => t.task === task.task) && task.task !== '') {
        res.status(201).json({ message: 'Task received successfully', task });
        tasks.push(task);
    }
})
app.post('/clear', (req, res) => {
    tasks.length = 0;
    res.status(201).json('Tasks clear successfully');
})
app.delete('/', (req, res) => {
    const task = req.body.task;
    if (tasks.findIndex(t => t === task)) {
        tasks.splice(task, 1);
        res.status(201).json('Task deleted successfully')
        return;
    }
    res.status(400).json('Task Not Found');
})
app.put('/', (req, res) => {
    const { task, edit } = req.body;
    if (edit !== '') {
        const index = tasks.findIndex(t => t.task === task)
        const index2 = tasks.findIndex(t => t.task === edit)
        if (index !== -1 && index === -1) {
            tasks[index].task = edit;
            res.status(201).json('Task edited successfully');
        } else
            res.status(400).json('Task Not Found Or The Edited Task Is Already In List');
    } else
        res.status(400).json('Invalid edit');
})
app.listen(port, () => {
    console.log('listen to port 3000');
})
module.exports = app;