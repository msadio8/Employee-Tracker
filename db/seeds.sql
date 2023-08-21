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

INSERT INTO employee ( first_name,last_name, role_id, manager_id)                           
VALUES ('Brad', 'Pitt', 1, null),
    ('Angelina', 'Jolie', 2, 1),
    ('Taylor', 'Swift', 2, 1),
    ('Jackie', 'Chan', 4, null),
    ('Emilia', 'Clark', 3, 4),
    ('Julia', 'Roberts', 3, 4),
    ('Johny', 'Deep', 3, 4),
    ('Leonardo', 'DiCarpio', 5, null),
    ('Mickey', 'Mouse', 6, 8),
    ('Charlize', 'Theron', 6, 8);
-- INSERT INTO manager(first_name, last_name)
-- SELECT first_name,
--     last_name
-- FROM employee
-- WHERE manager_confirm = 1;
