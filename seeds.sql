DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;
USE employeesDB;

CREATE TABLE department
(id INT PRIMARY KEY AUTO_INCREMENT,
department_name VARCHAR(30)
);

CREATE TABLE roles
(id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT
);

CREATE TABLE employee
(id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);

INSERT INTO department (department_name) VALUES
("Executive"), ("Judicial"), ("Legislative");

INSERT INTO roles (title, salary, department_id) VALUES
("Emperor", 100000.00, 1), ("Executioner", 90000.00, 2), ("Praetor", 666.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Julius", "Caesar", 1, 1),
("Genghis", "Khan", 1, 1),
("Josef", "Stalin", 1, 1),
("Judge", "Dredd", 2, 1),
("Judge", "Death", 2, 1),
("Marcus", "Brutus", 3, 1),
("Gaius", "Cassius", 3, 1);