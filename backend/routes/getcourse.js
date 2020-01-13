var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'external-dev-dwh.crytt7vw3by0.eu-west-1.rds.amazonaws.com',
    user: 'reportsdev',
    password: 'cod2FaN33e',
    database: 'echo_dwh'
})
router.get('/', function (req, res, next) {

    connection.query('SELECT learningGroupName FROM completion_per_user_better_office ORDER BY learningGroupName', function (err, result, fields) {
        if (err) throw err

        console.log('The solution is: ', result);
        var leraning = [...new Set(result.map(a => a.learningGroupName))];
        res.json(result);
    })

});

module.exports = router;