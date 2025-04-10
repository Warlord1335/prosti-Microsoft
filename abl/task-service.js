// test data, simulace databaze...
// pouziti JSDoc pro typovost
/**
 * @typedef {object} Task
 * @property {number} id - The unique identifier for the task
 * @property {string} name - The name of the task
 * @property {string} description - A brief description of the task
 */

/**
 * @typedef {Task[]} TaskList, An array of tasks representing the task list
 * 
 */
let taskList = [
    { id: 1, name: "Study math", description: "After " },
    { id: 2, name: 'Call mom', description: "ASAP" },
  ];

class TaskService {
    constructor() {
    }

    /**
     * @param {Task} taskData
     */
    async createTask(taskData) {
        taskData.id = taskList.length + 1,
        taskList.push(taskData);
        return taskData;
    }
    
    async getAllTasks() {
        return taskList;
    }

    async getTaskById(taskId) {
        return taskList.find((task) => task.id === parseInt(taskId));
    }

    async updateTask(taskId, taskData) {
        let task = taskList.find((element) => element.id === taskId);
        if (task) {
            task = {...taskData};
            // task.name = name; // mozne i takto
            // task.description = description;
          
            return task;
        }
        throw new Error('Task not found');
    }

    async deleteTask(taskId) {
        if (taskList.find((element) => element.id === taskId)) {
            return taskList = taskList.filter((task) => task.id !== parseInt(taskId));
        }
        throw new Error('Task not found');
    }
}

module.exports = new TaskService();
