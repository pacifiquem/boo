'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const port =  process.env.NODE_ENV == 'development'?  process.env.DEV_PORT : process.env.PROD_PORT;

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/profile')());

// start server
app.listen(port, () => {
    console.log(` Server started. Listening on ${port}`);
});