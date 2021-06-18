const express = require("express");
const routes = express.Router();

const hostname = "localhost";
const port = 3000;

routes.get('/', (req, res) => {
    return res.send("Server application running at " + hostname + ":" + port);
});

module.exports = routes;