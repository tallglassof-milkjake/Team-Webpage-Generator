const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const colors = require("colors");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { get } = require("http");

const team = [];


async function teamGenerator() {

    // Initial prompt (Which team member)
    function askQuestions() {
        inquirer.prompt([
            {
                type: "list",
                message: "Select employee",
                name: "role",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ]
            }
        ]).then(async function selectRole(data) {
            if (data.role === "Manager") {
                manager();
            } else if (data.role === "Engineer") {
                engineer();
            } else if (data.role === "Intern") {
                intern();
            }
        });
    };

    // Prompt asking if more employees
    function nextQuestion() {
        inquirer.prompt([
            {
                type: "list",
                message: "Select employee",
                name: "role",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "That is all"
                ]
            }
        ]).then(async (data) => {
                if (data.role === "Manager") {
                    manager();
                } else if (data.role === "Engineer") {
                    engineer();
                } else if (data.role === "Intern") {
                    intern();
                } else if (data.role === "That is all") {
                    getHTML()
                }
            }) .catch (error => {
                return error;
            });
    };
    
    // Manager Questions
    async function manager() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the managers name?",
                validate: validateString,
            },
            {
                type: "input",
                name: "id",
                message: "What is their ID number?",
                validate: validateInteger
            },
            {
                type: "input",
                name: "email",
                message: "What is the managers email?",
                validate: validateEmail
            },
            {
                type: "input",
                name: "office",
                message: "What is the managers office number?",
                validate: validateInteger
            },
        ]).then(function (data) {
            const managerInfo = new Manager(data.name, data.id, data.email, data.office);
            team.push(managerInfo);
            nextQuestion();

        }).catch(error => {
            console.log(error);
        });
    };

    

    // Engineer Questions
    async function engineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the engineers name?",
                validate: validateString
            },
            {
                type: "input",
                name: "id",
                message: "What is their ID number?",
                validate: validateInteger
            },
            {
                type: "input",
                name: "email",
                message: "What is the engineers email?",
                validate: validateEmail
            },
            {
                type: "input",
                name: "github",
                message: "What is the engineers github username?",
                validate: validateString
            },
        ]).then(function (data) {
            let github = `https://github.com/${data.github}`;

            const engineerInfo = new Engineer(data.name, data.id, data.email, github);
            team.push(engineerInfo);
            nextQuestion();

        }).catch(error => {
            console.log(error);
        });
    };

    // Intern Questions
    async function intern() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the intern name?",
                validate: validateString
            },
            {
                type: "input",
                name: "id",
                message: "What is their ID number?",
                validate: validateInteger
            },
            {
                type: "input",
                name: "email",
                message: "What is the interns email?",
                validate: validateEmail
            },
            {
                type: "input",
                name: "school",
                message: "What is the interns school?",
                validate: validateString
            },
        ]).then(function (data) {
            const internInfo = new Intern(data.name, data.id, data.email, data.school);
            team.push(internInfo);
            nextQuestion();

        }).catch(error => {
            console.log(error);
        });
    };

    async function startQuestions() {
        askQuestions();
    };
    
    startQuestions();

    // Get object and write to HTML
    function getHTML() {
        const myHTML = render(team);

        fs.writeFileSync(outputPath, myHTML, function (err) {
            if (err) return err;
                
            console.log("Success! You've made a team.html file!");
        });
    };
    
    // Validation Functions
    function validateString(answer) {
        const regEx = /[A-Za-z]/;
        const result = regEx.test(answer);
        const errorMessage = "That's not a real name".red;
        
        if (result == false) {
            return errorMessage;
        }
        return result;
    };

    function validateInteger(answer) {
        const regEx = /[0-9]/;
        const result = regEx.test(answer);
        const errorMessage = "Please enter only numbers".red;

        if (result == false) {
            return errorMessage;
        }
        return result;
    };

    function validateEmail(answer) {
        const regEx = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+.+[a-zA-Z]/;
        const result = regEx.test(answer);
        const errorMessage = "Please enter a valid email format".red;

        if (result == false) {
            return errorMessage;
        }
        return result;
    };
    
}
    
teamGenerator();