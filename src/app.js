const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// dotenv config
dotenv.config();

require('./db/mongoose');

// init express app
const app = express();

// bodyParser config
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Global Variables
const PORT = 3000 || process.env.PORT;

// Router Variables
const indexRouter = require('./routers/todos');
const userRouter = require('./routers/user');

// setting up router
app.use('/api/todos/', indexRouter);
app.use('/api/user/', userRouter);


app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})