INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Sales"),
       ("Legal");



INSERT INTO roles (title , salary, department_id)
VALUES ("Legal Team Lead", 250000, 1),
       ("Layer", 190000, 1),
       ("Accountant", 125000, 2),
       ("Account Manager", 2),
       ("Sofware Engineer", 120000, 3),
       ("Lead Engineer", 150000, 3),
       ("Salesperson", 80000, 4),
       ("Sales Lead", 100000, 4);
    
    

INSERT INTO employees (
        first_name, 
        last_name , 
        role_id, 
        manager_id, 
        manager_confirm
    )
VALUES ("Bad Pitt"),
       ("Angelina",  "Jolie", 1 null, true),
       ("Taylor", "Swift", 2, 1, false ),
       ("Jackie", "Chan", 3 null, true),
       ("Emilia", "Clark", 4, 2, false),
       ("Julia", "Roberts" 4, 2, false),
       ("Johny", "Deep", 4, 2,false),
       ("Leonardo", "DiCarpio", 5, null, true),
       ("Charlize", "Theron", 6 ,3 false);

INSERT INTO manager (first_name, last_name)
SELECT first_name,
       last_name
FROM employees
WHERE manager_confirm = 1;
       