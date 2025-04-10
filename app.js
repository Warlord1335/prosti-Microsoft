const express = require('express');
const app = express();
const taskRouter = require('./api/controllers/task-controller');
const verifyToken = require('./middleware/authMiddleware');  
// Middleware to handle JSON requests
app.use(express.json());
app.use('/', taskRouter);
app.Swagger = require('swagger-ui-express');  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
