const express = require('express');
const router = express.Router();
const taskService = require('../../abl/task-service');
// ukazka verifikace uzivatele
const verifyToken = require('../../middleware/authMiddleware');

// test data, simulace databaze...
let taskList = [
  { id: 1, name: "Study math", description: "After " },
  { id: 2, name: 'Call mom', description: "ASAP" },
];

// Get all taskList
router.get('/tasklist', async (_req, res) => {
  res.json(await taskService.getAllTasks());
});

// Get a single task by ID
router.get('/tasklist/:id', async (req, res) => {
  const { id } = req.params;
  const task = await taskService.getTaskById(id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

// Create a new task
router.post('/tasklist', async (req, res) => {
  const { name, description } = req.body;
  // Jednoducha valice - velice dulezite
  if (!name || !description) {
    return res.status(400).json({ message: 'Name and desc are required' });
  }
  let newTask = { name, description };
  newTask = await taskService.createTask(newTask);
  res.status(201).json(newTask);
});

// Update an existing task by ID
router.put('/tasklist/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // Jednoducha valice - velice dulezite
  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }
  let updateTask = { name, description };
  let task;
  try {
    task = await taskService.updateTask(parseInt(id), updateTask);
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});


// Delete a task by ID
router.delete('/tasklist/:id', (req, res) => {
  const { id } = req.params;
  try {
    taskService.deleteTask(id);
  } catch (error) {
    return res.sendStatus(404).json({ message: 'Task not found' });
  }
  res.sendStatus(204);

});

module.exports = router;

