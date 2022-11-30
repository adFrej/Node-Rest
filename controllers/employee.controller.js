const database = require("../server")

exports.getEmployees = async (req, res) => {
    if (req.query.city !== undefined) {
        return this.getEmployeesByCity(req, res);
    }
    console.log("Request for all employees.");
    const coll = database.collection("employees");
    const employees = await coll.find().limit(100).toArray()
    res.send(employees)
    console.log("Request completed.");
};

exports.getEmployeesByCity = async (req, res) => {
    let city = req.query.city
    if (city === undefined) {
        city = req.params.city
    }
    console.log(`Request for employees with city: ${city}`);
    const coll = database.collection("employees");
    const employees = await coll.find({ "city": city }).toArray()
    res.send(employees)
    console.log("Request completed.");
};

exports.getEmployeeById = async (req, res) => {
    const id = req.params.id
    console.log(`Request for employee with id: ${id}`);
    const coll = database.collection("employees");
    if (isNaN(parseInt(id))) {
        res.status(400).send("Bad id format.")
        return
    }
    const employee = await coll.findOne({id: parseInt(id) })
    if (!employee) {
        res.status(404).send("Employee not found.")
        return
    }
    res.send(employee)
    console.log("Request completed.");
};
