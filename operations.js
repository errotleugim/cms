
function viewAll();
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
}
function addDepartment(){
    inquirer
        .prompt({
            name: "department_name",
            type: "input",
            message: "What is the department name?",
        })
        .then((answer) => {
            console.log("Adding a new department...\n");
            connection.query(
                `INSERT INTO department SET ?`,
                {
                    department_name: answer.department_name,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New department added!\n");

                    initCMS();
                }
            );
        });
};
function addEmployee();
function addRole(){
    inquirer
        .prompt({
            name: "department_name",
            type: "input",
            message: "What is the department name?",
        })
        .then((answer) => {
            console.log("Adding a new department...\n");
            connection.query(
                `INSERT INTO roles SET ?`,
                {
                    department_name: answer.department_name,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New department added!\n");

                    initCMS();
                }
            );
        });
};
function deleteDepartment();
function deleteEmployee();
function deleteRole();


module.exports = operations;