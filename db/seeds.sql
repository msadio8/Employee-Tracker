INSERT INTO department (name)
VALUES ('Legal'),
    ('Sales'),
    ('Engineering');
INSERT INTO roles (title , salary, department_id)
VALUES ('Legal Team Lead', 250000, 1),
    ('Lawyer', 190000, 1),
    ('Salesperson', 80000, 2),
    ('Sales Lead', 100000, 2),
    ('Lead Engineer', 120000, 3),
    ('Engineer', 150000, 3);
INSERT INTO employee ( first_name,last_name, role_id, manager_id, manager_confirm)                           
VALUES ('Brad', 'Pitt', 1, null, true),
    ('Angelina', 'Jolie', 2, 1, false),
    ('Taylor', 'Swift', 2, 1, false),
    ('Jackie', 'Chan', 3, null, true),
    ('Emilia', 'Clark', 4, 2, false),
    ('Julia', 'Roberts', 4, 2, false),
    ('Johny', 'Deep', 4, 2, false),
    ('Leonardo', 'DiCarpio', 5, null, true),
    ('Mickey', 'Mouse', 6, 3, false),
    ('Charlize', 'Theron', 6, 3, false);
-- INSERT INTO manager(first_name, last_name)
-- SELECT first_name,
--     last_name
-- FROM employee
-- WHERE manager_confirm = 1;
