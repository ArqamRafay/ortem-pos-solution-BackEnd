const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const APIPage = require("./routes/api")

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
// app.use(express.static('public'));      //folder become public

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
// var port = normalizePort(process.env.PORT || '4300')
let port = process.env.PORT || 3000

// var ipAddress = '192.168.1.141'     // IP Address Home

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`listen: http://localhost:${port} `);
    }
})
