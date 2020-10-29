const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { get } = require("http");

const team = [];

async function heavyLoad() {



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
    }

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
    }
    
    // Manager Questions
    async function manager() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the managers name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is their ID number?" 
            },
            {
                type: "input",
                name: "email",
                message: "What is the managers email?" 
            },
            {
                type: "input",
                name: "office",
                message: "What is the managers office number?" 
            },
        ]).then(function (data) {
            const managerInfo = new Manager(data.name, data.id, data.email, data.office);

            console.log(managerInfo);
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
                message: "What is the engineers name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is their ID number?" 
            },
            {
                type: "input",
                name: "email",
                message: "What is the engineers email?" 
            },
            {
                type: "input",
                name: "github",
                message: "What is the engineers github username?" 
            },
        ]).then(function (data) {
            const engineerInfo = new Engineer(data.name, data.id, data.email, data.github);

            console.log(engineerInfo);
            team.push(engineerInfo);

            nextQuestion();
        }).catch(error => {
            console.log(error);
        })
    }

    // Intern Questions
    async function intern() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the intern name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is their ID number?" 
            },
            {
                type: "input",
                name: "email",
                message: "What is the interns email?" 
            },
            {
                type: "input",
                name: "school",
                message: "What is the interns school?" 
            },
        ]).then(function (data) {
            const internInfo = new Intern(data.name, data.id, data.email, data.school);
            
            console.log(internInfo);
            team.push(internInfo);

            nextQuestion();
        }).catch(error => {
            console.log(error);
        }) 
    }

    async function getSome() {
        askQuestions();
    }
    
    getSome();

    function getHTML() {

        const myHTML = render(team);
        console.log(myHTML);

        fs.writeFile(outputPath, myHTML, function (err) {
                        
            if (err) return err;
                
            console.log("Success! You've made a team.html file!");
                       
        });
    }

    
}
    
heavyLoad();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
