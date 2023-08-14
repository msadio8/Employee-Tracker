const mysql = require('mysql2');


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

const dropMngr = () => {
    db.query(
        `DROP TABLE IF EXIST manager`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.log('')
        }
    )
}

const createMngrTable = () => {
    db.query(
        `CREATE TABLE manager(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(30),
            last_name VARCHAR(30),
        )`,
        function (err , results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.log('')
        }

    )
};

const addMngrs = () => {
    db.query(
        `INSERT INTO manager (first_name, last_name)
        SELECT first_name,
           last_name
        FROM employee
        WHERE manager_confirm = 1`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.log('')
        }
    )
};
module.exports = {dropMngr, createMngrTable, addMngrs}