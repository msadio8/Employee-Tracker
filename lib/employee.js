const {promptUser} = require('../index');
const inquirer = require("inquirer");
const mysql = require("mysql2");
const {dropMngr, createMngrTable, addMngrs} = require('./create');

const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'winter123',
   database: 'employees'
});
  

function viewAllEmp() {

   db.query(
      `SELECT employee.id, 
      employee.first_name, 
      employee.last_name, 
      roles.title AS role,
      roles.salary AS salary,
      manager.first_name AS manager,
      department.name AS department
      FROM employee
      LEFT JOIN roles
      ON employee.role_id = roles.id
      LEFT JOIN manager
      ON employee.manager_id = manager.id`,
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

const viewAllEmpByDep = () => {
      db.query(
         `SELECT * FROM department`,

         function (err, results, fields) {
            if (err) {
               console.log(err.message);
               return;
            }
            depArr = [];
            results.forEach(item => {
               depArr.push(item.name)
            });
            inquirer
               .prompt({
                  type: 'list',
                  name: 'filter-emp-dep',
                  message: 'select a department to filter from:',
                  choices: depArr
               })
               .then((data) => {
                  db.query(
                     `SELECT employee.id, 
                        employee.first_name,
                        employee.last_name, 
                        department.name AS department
                        FROM employee
                        LEFT JOIN roles
                        ON employee.role_id = roles.id
                        LEFT JOIN department
                        ON roles.department_id = department.id
                        WHERE department.name =?`,
                     [data['filter-emp-dep']],
                     function (err, results, fields) {
                        if (err) {
                           console.log(err.message);
                           return;
                        }
                        console.table(results);
                        promptUser();
                     }
                  )
               });
         }
      );
};

const viewAllEmpByMngt = () => {
   db.query(
      `SELECT * FROM manager`,
      function (err, results, fields) {
         if (err) {
            console.log(err.message);
            return;
         }
         mngrArr = [];
         results.forEach(item => {
            mngrArr.push(item.first_name)
         })

         inquirer 
            .prompt({
               type: ' list',
               name: 'filter-emp-mngr',
               message: ' select a manager to filter from ',
               choices: mngrArr
            })
            .then((data) => {
               db.query(
                  `SELECT employee.id,
                     employee.first_name,
                     manager.first_name AS manager
                     FROM employee
                     LEFT JOIN manager
                     ON employee.manager_id = manager.id
                     WHERE manager.first_name = ?`,
                  [data['filter-emp-man']],
                  function (err, results, fields) {
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
   );
};

const addEmp = () => {
   db.query(
      `SELECT * FROM roles`,
      function (err, results, fields) {
         if (err) {
            console.log(err.message);
            return;
         }
         let roleArr = [];

         results.forEach(item => {
            roleArr.push(item.title)
         })
         db.query(
            `SELECT * FROM manager`,
            function (err, results, fields) {
               if (err) {
                  console.log(err.message);
                  return;
               }
               let mngrArr = [];

               results.forEach(item => {
                  mngrArr.push(item.first_name)
               });

               inquirer
                  .prompt([
                     {
                        type: 'text',
                        name: 'first_name',
                        message: ' What is the employee first name ?'
                     },
                     {
                        type: 'text',
                        name: 'last_name',
                        message: ' What is the employee last name ?'
                     },
                     {
                        type: 'list',
                        name: 'select_role',
                        message: ' What is the role for this new employee?',
                        choices: roleArr
                     },
                     {
                        type: 'confirm',
                        name: 'mngt_confirm',
                        message: 'is new employee role a manager position ?'
                     },
                     {
                        type: 'list',
                        name: 'select_mngt',
                        message: 'Who is the manager for the new employee?',

                        when: ({mngt_confirm}) => {
                           if (!mngt_confirm) {
                              return true;

                           } else {
                              return false;
                           }
                        },
                        choices: mngrArr
                     }
                  ])
                  .then((data) => {

                     let role_id;
                     for (i = 0; i < roleArr.length; i++) {
                        if (data.select_role === roleArr[i]) {
                           role_id = i + 1
                        }
                     }

                     let manager_confirm;
                     if (data.mngt_confirm === true) {
                        manager_confirm = 1;
                     } else {
                        manager_confirm = 0
                     }

                     let manager_id;
                     
                     if (!data.select_mngt) {
                        manager_id = null;
                     } else {
                        for (i = 0; i < mngrArr.length; i++) {
                           if (data.select_mngt === mngrArr[i]) {
                              manager_id = i + 1
                           }
                        }
                     }
                     db.query(
                        `INSERT INTO employee (first_name,last_name, role_id, manager_id, manager_confrim)
                           VALUES (?, ?, ?, ?, ?)`,
                        [data.first_name, data.last.name, role_id, manager_confirm],
                        function (err, results, fields) {
                           if (err) {
                              console.log(err.message);
                              return;
                           }
                           dropMngr();
                           createMngrTable();
                           addMngrs();
                           console.log('New employee added 👍!');
                           promptUser();
                        }
                     );


                  });
            }
         );
      }
   );
};

const upEmp = () => {
      db.query(
         `SELECT * FROM roles`,
         function (err, results, fields ) {
            if (err) {
               console.log(err.message);
               return;
            }

            let roleArr = [];

            results.forEach(item => {
               roleArr.push(item.title)
            })

            db.query(
               `SELECT first_name, last_name FROM employee`,
               function (err, results, fields) {
                  if (err) {
                     console.log(err.message);
                  }

                  let nameArr = [];
                  results.forEach(item => {
                     nameArr.push(item.first_name);
                     nameArr.push(item.last_name);
                  })
                  let allNameArr = [];
                  for (let i = 0; i < nameArr.length; i += 2) {
                     if (!nameArr[i + 1])
                     break 
                     allNameArr.push(`${nameArr[i]} ${nameArr[i + 1]}`)
                  }
                  inquirer
                     .prompt([
                        {
                           type: 'list',
                           name:'select_name',
                           message: ' Please select an employee you would like to update',
                           choices: allNameArr
                        },
                        {
                           type: 'list',
                           name:'select_role',
                           message: ' Please select a role  you want this employee to change to ',
                           choices: roleArr
                        }

                     ])
                     .then((data) => {
                        let role_id;
                        for (let i = 0; i < roleArr.length; i++ ) {
                           if (data.select_role === roleArr[i]) {
                              role_id = i + 1;
                           }
                        };
                        let selectedNameArr = data.select_name.split("");
                        let last_name = selectedNameArr.pop();
                        let first_name = selectedNameArr[0];

                        db.query(
                           `UPDATE employee
                                 SET role_id = ?
                                 WHERE first_name = ? AND last_name = ?`,
                           [role_id, first_name, last_name],
                           function (err, results, fields) {
                              if (err) {
                                 console.log(err.message);
                                 return;
                              }
                              console.log('Employee has been Updated !');
                              promptUser();
                           }      


                        );
                     });
               
               }
            );
         }
      );
};
module.exports = { viewAllEmp, viewAllEmpByDep, viewAllEmpByMngt, addEmp, upEmp};