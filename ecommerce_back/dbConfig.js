const mysql = require("mysql");

let dbconn = null;

dbconn=mysql.createPool({
  host:"localhost",
  user:"root",
  database:"naveen_db",
  password:"",
  multipleStatements: true
})


dbconn.getConnection((err)=>{
    if(err){
        console.log("database is not connected")
    }else{
        console.log("database connected succsessfully!")
    }
})

module.exports=dbconn;