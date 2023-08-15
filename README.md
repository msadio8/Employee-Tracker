# SQL: Employee Tracker

# License

This application is under:

![badge](https://img.shields.io/badge/License-MIT-green.svg)

# Description

This is a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

# Table of Contents

- [Description](#description)

- [Installation](#installation)

- [License](#license)

- [User Story](#user-story)

- [Acceptance-Criteria](#acceptance-criteria)

- [Tests](#tests)

# Installation

create the following file

schema.sql

seed.sql

department.js

roles.js

promptUser.js 

utilisedBudget.js

install npm i inquirer@8.2.4

install install npm i mysql2

# User-Story


AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business


# Acceptance-Criteria

GIVEN a command-line application that accepts user input

WHEN I start the application

THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an 
employee, and update an employee role

WHEN I choose to view all departments

THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles

THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees

THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department

THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role

THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee

THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role

THEN I am prompted to select an employee to update and their new role and this information is updated in the database

# Tests

This application won't be deployed please refer to my walthrough video and screeshots

[walkthrough🎬](https://drive.google.com/file/d/1sQTharfTWabaVAmUykiVhR4jUW7JfyaZ/view).

![Alt text](<Screenshot 2023-08-15 at 10.55.43 pm.png>)