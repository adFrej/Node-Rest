const employees = require("../controllers/employee.controller");
module.exports = app => {
    const employees = require("../controllers/employee.controller");

    const router = require("express").Router();

    router.get("/", employees.getEmployees);

    router.get("/:id", employees.getEmployeeById);

    router.get("/city/:city", employees.getEmployeesByCity);

    app.use("/employee", router);
};
