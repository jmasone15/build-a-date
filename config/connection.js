var mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
    username: "root",
    password: "rootroot",
    database: "datenightdb",
    host: "127.0.0.1",
    
    })
}