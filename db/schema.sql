DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role (
    id: INT PRIMARY KEY
    title: VARCHAR(30)
    salary: DECIMAL
    department_id: INT 
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id: INT PRIMARY KEY
    first_name: VARCHAR(30) 
    last_name: VARCHAR(30)
    role_id: INT 
    FOREIGN KEY (role_id) REFERENCES employee (id)
    manager_id: INT 
    FOREIGN KEY (manager_id) REFERENCES employee (id) NOT NULL

);
