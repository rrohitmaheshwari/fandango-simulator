var mysql       = require('mysql');

//Put your mysql configuration settings - user, password, database and port
let pool = mysql.createPool({
    host            : '54.176.242.8',
    user            : 'root',
    password        : 'fandangodb',
    database        : 'fandangodb',
    connectionLimit : 10,
    multipleStatements: true,
});

function fetchData(callback,sqlQuery){
    console.log("\nSQL Query::"+sqlQuery);
    pool.getConnection(function (err, connection) {
        connection.query(sqlQuery, function(err, rows, fields) {
            if(err){
                console.log("ERROR: " + err.message);
            } else {
                // return err or result
                console.log("MySQL Pool DB Results:");
                console.log(rows);
            }
            console.log("\nConnection closed..");
            connection.release();
            callback(err, rows);
        });
    });
}
exports.fetchData=fetchData;