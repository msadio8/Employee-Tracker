const {promptUser} = require('../index');
const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'winter123',
    database: 'employees'
});

function viewRoles() {
    db.query(
        `SELECT roles.id, roles.title, roles.salary, department.name
           FROM roles
           LEFT JOIN departmment
           ON roles.department_id = department.id`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(results);
            promptUser();
        }

    );
}

const addRole = () => {
    db.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            if (err) {
                console.log(err);
                return;
            }
            let depArr = [];
            results.forEach(item =>{
                depArr.push(item.name)
            })

            inquirer
                .prompt([
                    {
                        type: 'text',
                        name: 'role_title',
                        message: 'Please enter the name of the role you want to add:'
                    },
                    {
                        type: 'amount',
                        name: 'salary',
                        message: 'Please enter nominated salary for this role.(no commas or periods)'
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Please select the department for role',
                        choices: depArr
                    }
                ])
                .then((data) => {
                    let department_id;

                    for (let i = 0; i <depArr.length; i++) {
                        if (depArr[i] === data.department) {
                            department_id = i + 1;
                        };
                    };
                    db.query(
                        `INSERT INTO roles (title, salary, department_id)
                           VALUES(?,?,?)`,
                        [data.role_title, data.salary, department_id],
                        function (err, results, fields) {
                            if (err) {
                                console.log(err.message);
                                return;
                            }
                            console.log('New Role added!');
                            promptUser();
                        }
                    );
                });
        }
    );
};
module.exports = { viewRoles, addRole};