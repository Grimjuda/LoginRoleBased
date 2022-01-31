require('dotenv').config({path: './config.env'})
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


const db = require("./models")

db.sequelize.sync();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Prueba MySQL." });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});