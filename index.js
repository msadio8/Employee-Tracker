const { utilBudget } = require("./lib/utilisedBudget");
const { viewRoles, addRole } = require("./lib/roles");
const {
  // viewAllEmp,
  viewAllEmpByDep,
  viewAllEmpByMngt,
  addEmp,
  upEmp,
} = require("./lib/employee");
const { viewDep, addDep } = require("./lib/department");
const inquirer = require("inquirer");
const mysql =  require('mysql2')

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "winter123",
  database: "employees",
});

const promptUser = () => {
  inquirer

    .prompt({
      type: "list",
      name: "show choices",
      message: "What would you like to do ?",
      choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees By Manager",
        "Add Employee",
        "Update Employee Role",
        "View Department",
        "Add Department",
        "View Roles",
        "Add Role",
        "View utilised budget",
        "Quit",
      ],
    })

    // use switch statement instead of if,else function refer documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch.
    .then((data) => {
      switch (data["show choices"]) {
        case "View All Employees":
          viewAllEmp();
          break;
        case "View All Employees by Department":
          viewAllEmpByDep();
          break;
        case "View All Employees by Manager":
          viewAllEmpByMngt();
          break;
        case "Add Employee":
          addEmp();
          break;
        case "Update Employee Role":
          upEmp();
          break;
        case "View Departments":
          viewDep();
          break;
        case "Add Department":
          addDep();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View utilised budget":
          utilBudget();
          break;
        case "Quit":
          process.exit()

      }
    });
};

const viewAllEmp = () => {
  db.query(
    `SELECT employee.id, 
       employee.first_name, 
       employee.last_name, 
       roles.title AS roles,
       roles.salary AS salary,
       concat(manager.first_name, ' ', manager.last_name) AS manager,
       department.name AS department
       FROM employee
       LEFT JOIN roles
       ON employee.role_id = roles.id
       LEFT JOIN department
       ON roles.department_id = department.id
       lEFT JOIN employee as manager
       ON manager.id = employee.manager_id`,
    function (err, results, fields) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.table(results);
      promptUser();
    }
  );
};

promptUser();

module.exports = { promptUser };
