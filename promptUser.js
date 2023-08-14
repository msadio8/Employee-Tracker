const inquirer = require("inquirer");

const promptUser = () => {
  inquirer

    .prompt({
      type: "list",
      name: "show choices",
      message: "What would you like to do ?",
      choices: [
        "View All",
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
        "Delete Departments",
        "Delete role",
        "Quit",
      ],
    })

    // use switch statement instead of if,else function refer documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch.
    .then((data) => {
      switch (data["show choices"]) {
        case "View All":
          viewAll();
          break;
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
        case "View Department":
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
        case "Delete Departments":
          delDep();
          break;
        case "Delete Role":
          delRole();
          break;
        case "Quit":
          break;
      }
    });
};
module.exports = { promptUser };
