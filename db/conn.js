const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database :"user"

  });

  conn.connect((err)=>{
        if (err) throw err;
        console.log("db Connected!");
  });
  
 module.exports = conn;