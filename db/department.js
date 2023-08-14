const { promptUser } = require("../promptUser");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
   {
      host: "localhost",
       // MySQL username,
      user: "root",
       // MySQL password
      password: "winter123",
      database: "employees_db",
    },
    console.log(`Connected to the employees_db database.`)
);

const viewAll = () => {
    db.query(
        `SELECT * FROM ALL Department`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(results);
            promptUser();
        }
    )
}

const viewDep = () => {
    db.query(
        `SELECT * FROM  Department`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(results);
            promptUser();
        }
    )
}

const addDep = () => {
    inquirer 
        .prompt({
            type: 'text',
            name: 'dep_name',
            message: 'Please enter the name of the department you want to add:'
        })
        .then((data) => {
            db.query(
                `INSERT INTO department (name)
                VALUES(?)`,
                [data.dep_name],
                function (err, results, fields) {
                    if (err) {
                       console.log(err.message);
                       return;
                    }
                    console.log('Added department');
                    promptUser
                }
            )
        })
        
    
}
module.exports = {viewAll, viewDep, addDep}