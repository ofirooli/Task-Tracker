const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db'); // Database connection

// Import your controllers
const tasksController = require('./controllers/tasksController');
const projectsController = require('./controllers/projectsController');
const usersController = require('./controllers/usersController');
const milestonesController = require('./controllers/milestonesController');

const app = express();
const PORT = 4000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Use the controllers to handle routes
app.use('/tasks', tasksController);
app.use('/projects', projectsController);
app.use('/users', usersController);
app.use('/milestones', milestonesController);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
