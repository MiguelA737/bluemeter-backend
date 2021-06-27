const express = require("express");
const routes = express.Router();

const hostname = "localhost";
const port = 3000;

const CompanyController = require("./controllers/CompanyController");
const HydrometerController = require("./controllers/HydrometerController");
const UserController = require("./controllers/UserController");

routes.get('/', (req, res) => {
    return res.send("Server application running at " + hostname + ":" + port);
});

routes.post("/user/signup", UserController.store);

routes.get("/user/", UserController.findById);

routes.post("/company/signup", CompanyController.store);

routes.get("/company/", CompanyController.findById);

routes.post("/hydrometer/new", HydrometerController.store);

routes.get("/hydrometer/", HydrometerController.findById);

routes.post("/hydrometer/write-reading", HydrometerController.writeNewReading);

module.exports = routes;