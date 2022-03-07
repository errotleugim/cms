const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require("express");

const app = express();
const PORT = 3301;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "notapassword",
    database: "cmsDB",
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);

    initCMS();
});


function initCMS() {
    inquirer
        .prompt({
            name: "what",
            type: "list",
            message: "Welcome to the employee tracker management system. What would you like to do?",
            choices: [
                {
                    name: "Add a department",
                    value: "addDepartment",
                },
                {
                    name: "Add a role",
                    value: "addRole",
                },
                {
                    name: "Add an employee",
                    value: "addEmployee",
                },
                {
                    name: "View all departments, roles, or employees",
                    value: "view",
                },
                {
                    name: "Update employee roles",
                    value: "update",
                },
                {
                    name: "Delete a department",
                    value: "deleteDepartment",
                },
                {
                    name: "Delete a role",
                    value: "deleteRole",
                },
                {
                    name: "Delete an employee",
                    value: "deleteEmployee",
                },
                new inquirer.Separator(),
                {
                    name: "Exit Employee Tracker",
                    value: "exit",
                },
            ]
        })
        .then(function (answer) {
            switch (answer.what) {
                case "view":
                    viewAll();
                    break;

                case "addDepartment":
                    addDepartment();
                    break;

                case "addRole":
                    addRole();
                    break;

                case "addEmployee":
                    addEmployee();
                    break;

                case "update":
                    updateRole();
                    break;

                case "deleteDepartment":
                    deleteDepartment();
                    break;

                case "deleteRole":
                    deleteRole();
                    break;

                case "deleteEmployee":
                    deleteEmployee();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}
