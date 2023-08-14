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

const utilBudget = () => {
    db.query(`SELECT * FROM department`,
        function (err, results) {
            if (err) {
                console.log(err.message);
                return;
            }
            depArr = [];
            results.forEach(item =>{
                depArr.push(item.name);
            });

            inquirer 
                .prompt({
                    type: 'list',
                    name: 'dep_choice',
                    message: 'Please select the  department to see the total amount of  budget has been utilized',
                    choices: depArr
                })
                .then((data) => {
                    let department_id;
                    for (let i = 0; i < depArr.lenght; i++) {
                        if (depArr[i] === data.dep_choice) {
                            department_id = i + 1;
                        }; 
                    };

                    db.query(
                        `SELECT department.name AS department, SUM(roles.salary) AS total_salary
                        FROM employee
                        LEFT JOIN roles
                        ON employee.role_id = roles_id
                        LEFT JOIN department
                        ON roles.department_id = department.id
                        WHERE department_id = ?`,
                        [department_id],
                        function (err, results) {
                            if (err) {
                                console.log(err.message);
                                return;
                            }
                            console.table(results);
                            promptUser();
                        }

                    );
                });



        }
    )
}
    

module.exports = { utilBudget };
