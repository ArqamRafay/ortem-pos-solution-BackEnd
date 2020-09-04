const mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    // password: "password",
    database: "test",
    port: "3306",
    multipleStatements: true
})
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log("mySql Connection Failed, Error: "+err);
    }
})

module.exports = mysqlConnection;