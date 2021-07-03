const express = require("express");
const routes = express.Router();

const CompanyController = require("./controllers/CompanyController");
const HydrometerController = require("./controllers/HydrometerController");
const UserController = require("./controllers/UserController");

routes.get('/', (req, res) => {
    return res.send("Inicialização de software concluída.");
});

routes.post("/user/signup", UserController.store);

routes.get("/user/", UserController.findById);

routes.post("/company/signup", CompanyController.store);

routes.get("/company/", CompanyController.findById);

routes.post("/company/update-pricing", CompanyController.updatePricing);

routes.post("/hydrometer/new", HydrometerController.store);

routes.get("/hydrometer/", HydrometerController.findById);

routes.post("/hydrometer/write-reading", HydrometerController.writeNewReading);

module.exports = routes;