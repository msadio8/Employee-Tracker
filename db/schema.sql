DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees;

DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

CREATE TABLE manager (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
  first_name VARCHAR(30),
  last_name VARCHAR(30),
);

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY
  name VARCHAR(30)
);

CREATE TABLE role (
    id: INT AUTO_INCREMENT NOT NULL PRIMARY KEY
    title: VARCHAR(30)
    salary: DECIMAL
    department_id: INT 
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id: INT AUTO_INCREMENT NOT NULL PRIMARY KEY
    first_name: VARCHAR(30) 
    last_name: VARCHAR(30)
    role_id: INT 
    FOREIGN KEY (role_id) REFERENCES roles (id),
    manager_id: INT 
    FOREIGN KEY (manager_id) REFERENCES roles (id) ON DELETE SET  NULL
);
