const express = require("express");
const router = express.Router();
// var request = require('request');

const mysqlConnection = require("../connection");
// const querystring = require('querystring');

// working http://localhost:3000/people
router.get("/", (req, res) => {
    debugger;
    mysqlConnection.query("select * from people", (err, rows, field) => {
        if (!err) {
            // res.status(200).json('Data Fetch');
            res.send(rows);
        }
        else {
            console.log("Error: " + err);
        }
    })
})

// working http://localhost:3000/people
// router.post("/", function (req, res) {
//     var _name = req.body.name
//     var _age = req.body.age
//     const _query = "INSERT INTO people (name, age) VALUES ('" + _name + "', '" + _age + "' );"
//     mysqlConnection.query(_query, (err, rows, field) => {
//         if (!err) {
//             res.status(201).json('Data Inserted');
//             res.json(rows);
//         }
//         else 
//             console.log("Error: " + err);
//     })
// });


// another way of post service good approach
router.post("/", function (request, responce) {

    let { name, age } = request.body;
    // const requestAge = request.param.age;

    const _query = `INSERT INTO people (name, age) VALUES ( "${name}","${age} ")`;

    mysqlConnection.query(_query, function (err, result, field) {
        if (err) throw err;
        return responce.status(200).send(result);
    })
});



router.put("/", (request, responce) => {
    // console.log("request.body.name: " + request.body.name)
    // console.log("request.body.Newname: " + request.body.Newname)
    // console.log("request.body.NewAge: " + request.body.NewAge)

    const _query = "UPDATE people SET name = '" + request.body.Newname + "', age = '" + request.body.NewAge + "' WHERE name = '" + request.body.name + "';"
    console.log(_query);
    mysqlConnection.query(_query, (err, rows, field) => {
        if (!err) {
            responce.status(201).json('Data Updated');
        }
        else
            console.log("Error: " + err);
    })
});

router.delete("/", (request, responce) => {
    const _query = "delete from people where name = '"+request.body.DeleteName+"'";
    console.log(_query);
    mysqlConnection.query(_query, (err, rows, field) => {
        if (!err)
            responce.status(200).json('Record deleted');
        else
            console.log(err)
    })
})


// 200 — OK, The request was successful
// 201 — CREATED, A new resource object was successfully created
// 404 — NOT FOUND, The requested resource could not be found
// 400 —BAD REQUEST, The request was malformed or invalid
// 500 — INTERNAL SERVER ERROR, Unknown server error has occurred

module.exports = router;