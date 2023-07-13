'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
require("./utils/db.util");
const errorHandler = require("./middlewares/err.middleware");
const profileRotues = require("./routes/profile.routes");
const commentsRoutes = require("./routes/comments.routes");


app.use(express.json()) // parsing body

const port =  process.env.NODE_ENV == 'development'?  process.env.DEV_PORT : process.env.PROD_PORT;

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/apis/v1/profile', profileRotues);
app.use("/apis/v1/comment", commentsRoutes);

// error handling
app.use(errorHandler);

// start server
app.listen(port, () => {
    console.log(` Server started. Listening on ${port}`);
});