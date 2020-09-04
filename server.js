
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const PeopleRoutes = require("./routes/people");
const APIPage = require("./routes/api")
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());
app.use("/people/:name", PeopleRoutes);
app.use("/api", APIPage);

console.log('Welcom to node.js BackEnd')

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
console.log('Welcom to node.js BackEnd')

// console.log(process.env.USERNAME)
var port = normalizePort(process.env.PORT || '4500')
var ipAddress = '10.0.0.239';    // IP Address

app.listen(port, ipAddress, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("listen: " + ipAddress + ':' + port);
    }
})
