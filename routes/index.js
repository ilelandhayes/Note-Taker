const express = require('express');

// Import our modular routers for /notes
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

// Initializes the route
module.exports = app;