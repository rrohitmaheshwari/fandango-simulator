const mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection(){
    let connection = mysql.createConnection({
        host     : '54.176.242.8',
        user     : 'root',
        password : 'root',
        database : 'fandangodb',
        port	 : 3306
    });
    return connection;
}

function fetchData(callback,sqlQuery){

    let connection = getConnection();

    connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
        } else {
            console.log("MySQL DB Results:"+rows);
        }
        callback(err, rows);
    });
    console.log("\nConnection closed..");
    connection.end();
}

exports.fetchData=fetchData;