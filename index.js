const inquirer = require("inquirer");

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
          break;
      }
    });
};
module.exports = { promptUser }
const { utilBudget } = require('./lib/utilisedBudget');
const { viewRoles, addRole } = require('./lib/roles');
const {
  viewAllEmp,
  viewAllEmpByDep,
  viewAllEmpByMngt,
  addEmp,
  upEmp,
} = require('./lib/employee');
const { viewDep, addDep } = require('./lib/department');

promptUser()
