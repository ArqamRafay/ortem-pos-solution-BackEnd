const express = require('express');
const router = express.Router();
var sql = require("mssql/msnodesqlv8");

// config for your database
var config = {
    driver: "msnodesqlv8",
    server: "DESKTOP-P331KUC",
    database: "MCCdb",
    options: {
        trustedConnection: true,
        useUTC: true
    }
};

router.get('/testnodeapi', function (req, res) {
    res.send('Node server live now...');
});

router.get('/getAllUser', function (req, res) {
    sql.connect(config, function (err) {
        if (err) throw err;
        var request = new sql.Request();
        request.query("select * from tblUser", function (err, recordset) {
            if (err) {
                console.log('error' + err)
                return res.status(400).send({ status: false })
            }
            else {
                return res.status(200).send(JSON.stringify(recordset['recordset']));
            }
        });
    });
})

router.post('/createNewUser', function (req, res) {

    sql.connect(config, (function (err) {
        if (err) console.log(err);
        try {
            var request = new sql.Request();
            console.log(req.body);
            let username = req.body['username']
            let password = req.body['password']
            let email = req.body['email']
            let roles = req.body['AsignRoleList']
            let fullname = req.body['fullname']
            let accessToken = req.body['AccessToken']
            let refreshToken = req.body['refreshToken']
            let pic = req.body['pic']
            let occupation = req.body['occupation']
            let companyName = req.body['companyName']
            let phone = req.body['phone']
            let address = req.body['address']

            let query = "insert into tblUser(username,password,email,accessToken,pic,fullname,roles) values ('" + username + "','" + password + "','" + email + "','" + accessToken + "','" + pic + "','" + fullname + "','" + roles + "')";
            console.log(query);
            request.query(query, function (err, recordset) {
                if (err) {
                    console.log('error ' + err)
                    res.send({ status: false });
                }
                else {
                    res.send({ status: true });
                }
            });

        } catch (error) {
            console.log('e: ' + error)
            res.send({ status: false });
        }
    }));

})

router.delete('/DeleteUser/:userId?', function (req, res) {
    sql.connect(config, (function (err) {
        if (err) console.log(err);
        try {
            var request = new sql.Request();
            console.log(req.body);
            res.send({ status: true });
            let query = 'delete from tblUser where ' + req.params.UserId
            request.query(query, function (err, recordset) {
                if (err) {
                    console.log('error ' + err)
                    res.send({ status: false });
                }
                else {
                    res.send({ status: true });
                }
            });

        } catch (error) {
            console.log('e: ' + error)
            res.send({ status: false });
        }
    }));
})

module.exports = router;