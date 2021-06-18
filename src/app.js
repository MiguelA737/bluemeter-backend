const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

const hostname = "localhost";
const port = 3000;

app.use(routes);

app.listen(process.env.PORT || port);