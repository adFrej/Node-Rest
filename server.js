const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");
const dbConfig = require("./config/db.config");

const app = express();

const corsOptions = {
    origin: "http://localhost:8082"
};

const client = new MongoClient(dbConfig.url);
const database = client.db();
module.exports = database

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});

require("./routes/employee.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
