const mysql = require("mysql");
const inquirer = require("inquirer");
// const express = require("express");
// // module.import { viewAll, displayAllDepartments, displayAllRoles, addDepartment, addEmployee, addRole, deleteDepartment, deleteEmployee, deleteRole } from 'operations.js'


// const app = express();
// const PORT = 3301;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "hails8n",
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

function viewAll() {
    inquirer
        .prompt({
            name: "table",
            type: "list",
            message:
                "Would you like to view all departments, roles, or employees?",
            choices: [
                {
                    name: "Departments",
                    value: "department",
                },
                {
                    name: "Roles",
                    value: "roles",
                },
                {
                    name: "Employees",
                    value: "employee",
                },
            ],
        })
        .then(function (answer) {
            console.log(`Selecting all from ${answer.table}...`);

            switch (answer.table) {
                case "department":
                    displayAllDepartments();
                    break;

                case "roles":
                    displayAllRoles();
                    break;

                case "employee":
                    displayAllEmployees();
                    break;
            }

            initCMS();
        });
}

function displayAllDepartments(){
    let query = "SELECT * FROM departments ";
    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log("\n\n ** Full Employee list ** \n");
        console.table(res);
    });
};
function displayAllRoles(){
    let query = "SELECT * FROM roles ";
    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log("\n\n ** Full Employee list ** \n");
        console.table(res);
    });
};

function displayAllEmployees(){
    let query = "SELECT * FROM employee ";
    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log("\n\n ** Full Employee list ** \n");
        console.table(res);
    });
};
function addDepartment(){
    inquirer
        .prompt({
            name: "department_name",
            type: "input",
            message: "What is the department name?",
        })
        .then((answer) => {
            connection.query(
                `INSERT INTO department SET ?`,
                {
                    department_name: answer.department_name,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New department added!");
                    initCMS();
                }
            );
        });
};
function addEmployee() {
    inquirer
    .prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
        },
        {
            name: "roleId",
            type: "input",
            message: "What is this employee's role ID?",
        },
        {
            name: "managerId",
            type: "input",
            message: "What is this employee's manager ID?",
        },
    ])
    .then((answer) => {
        connection.query(
            `INSERT INTO employee SET ?`,
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId,
            },
            function (err, res) {
                if (err) throw err;

                initCMS();
            }
        );
    });
};
function addRole(){
    inquirer
        .prompt({
            name: "department_name",
            type: "input",
            message: "What is the department name?",
        })
        .then((answer) => {

            connection.query(
                `INSERT INTO roles SET ?`,
                {
                    department_name: answer.department_name,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New department added!");

                    initCMS();
                }
            );
        });
};
function deleteDepartment() {
    displayAllDepartments();

    inquirer
        .prompt({
            name: "departmentId",
            type: "input",
            message: "Enter the ID of the department you want to delete",
        })
        .then((answer) => {

            connection.query(
                "DELETE FROM department WHERE ?",
                {
                    id: answer.departmentId,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Department deleted!");

                }
            );

            connection.query(
                "UPDATE roles SET ? WHERE ?",
                [
                    {
                        department_id: "0",
                    },
                    {
                        department_id: answer.departmentId,
                    },
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(
                        "Associated roles have been set to department 0."
                    );
                }
            );

            initCMS();
        });
};
function deleteEmployee() {
    displayAllEmployees();

    inquirer
        .prompt({
            name: "employeeId",
            type: "input",
            message: "Enter the ID of the employee you want to delete",
        })
        .then((answer) => {
            console.log("Deleting employee...\n");
            connection.query(
                "DELETE FROM employee WHERE ?",
                {
                    id: answer.employeeId,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee deleted!");
                }
            );

            initCMS();
        });
};

function deleteRole(){

     displayAllRoles();

     inquirer
         .prompt({
             name: "roleId",
             type: "input",
             message: "Enter the ID of the role you want to delete",
         })
         .then((answer) => {
             console.log("Deleting role...\n");
 
             connection.query(
                 "DELETE FROM roles WHERE ?",
                 {
                     id: answer.roleId,
                 },
                 function (err, res) {
                     if (err) throw err;
                     console.log("Department deleted!\n");
                 }
             );
 
             connection.query(
                 "UPDATE employee SET ? WHERE ?",
                 [
                     {
                         role_id: "0",
                     },
                     {
                         role_id: answer.roleId,
                     },
                 ],
                 function (err, res) {
                     if (err) throw err;
                     console.log(
                         "Role is now = 0"
                     );
                 }
             );
 
             initCMS();
         });
 };


 initCMS();
