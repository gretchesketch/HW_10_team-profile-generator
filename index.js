// required packages
const fs = require('fs');
const inquirer = require('inquirer');

// Employee template based on these below.
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");



// using const to declare a variable identified by teamMembers.
// the value is currently an empty array, but will be dyanamicaly assigned a value through the comand line.
const teamMembers = [];
// using let so that the value of manager can be changed as needed. 
let manager;
// This info is for the HTML.
let teamTitle;


// creating a function of manager data that uses inquirer to prompt the user to enter the appropriate employee information.
function managerData() {
    inquirer.prompt([
        {   // prompts user for the name of the team
            type: "input",
            message: "What is the name of this team/project?",
            name: "teamTitle"
        },
        {   // asks user for the team Managers name
            type: "input",
            message: "Who is the manager of this project?",
            name: "managerName"
        },
        {   // prompts user for the managers id.
            type: "input",
            message: "What is the manager's ID?",
            name: "managerID"
        },
        {   // prompts user for the managers email address.
            type: "input",
            message: "What is the manager's email?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "What is the office number?",
            name: "phone number"
        }]).then(managerAnswers => {
            manager = new Manager(managerAnswers.managerName, managerAnswers.managerID, managerAnswers.managerEmail, managerAnswers.officeNumber);
            teamTitle = managerAnswers.teamTitle;
            console.log("Next input additional employee information")
            employeeData();
        });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// creating a function similiar to the manager function that prompts the user for additional employee information
// intern or engineer
function employeeData() {
    inquirer.prompt([
        {
            // prompts user for the title of the employee but gives the user only 2 choices that have to be selected using the arrows on the keyboard.
            type: "list",
            message: "What is this employee's role?",
            name: "employeeRole",
            choices: ["Intern", "Engineer"]
        },
        {
            // prompts user for the employees name
            type: "input",
            message: "What is the employee's name?",
            name: "employeeName"
        },
        {
            // prompts user for the employee id
            type: "input",
            message: "What is the employee's id?",
            name: "employeeId"
        },
        {
            // prompts user for employee email
            type: "input",
            message: "What is the employee's email?",
            name: "employeeEmail"
        },
        {
            // if the user selected engineer then they will be prompted for the users github account.
            type: "input",
            message: "What is the Engineer's Github?",
            name: "github",
            when: (userInput) => userInput.employeeRole === "Engineer"
        },
        {
            // if the user selected intern as the employee title then they will be prompted for the interns school name
            type: "input",
            message: "What's the Intern's school?",
            name: "school",
            when: (userInput) => userInput.employeeRole === "Intern"
        },
        {
            // prompts user to add an additional employee or indicate that they are finsihed inputing data.
            // if the user says yes then they will prompted for information all over again/
            // if the user says no then the code to write the html file will execute.
            type: "confirm",
            name: "newEmployee",
            message: "Would you like to add another team member?"
        }
    ]).then(answers => {
        // if the user selects intern using the arrows in the command line do this:
        if (answers.employeeRole === "Intern") {
            const employee = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.school);
            teamMembers.push(employee);
        // if the user selects engineer using the arrows in the commandline do this:
        } else if (answers.employeeRole === "Engineer") {
            // A different way of pushing the info into teamMembers array.
            teamMembers.push(new Engineer(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.github));
        }
        // if the user indicates with y that they need to add another employee then run the employeeData function again.
        if (answers.newEmployee === true) {
            employeeData();
        // if the user indicates with n that they are finised inputing employee data then move on to generate the html file.
        } else {
            
            var main = fs.readFileSync('./templates/main.html', 'utf8');
            // The slashes and g => regular expressions (regex)
            // This allows the replace function to replace all occurances of teamTitle.
            // If I just did '{{teamTitle}}' then it only replaces the first instance.
            main = main.replace(/{{teamTitle}}/g, teamTitle);

            // Loop through the employees and print out all of their cards without replacing the previous one.
            var managerCard = fs.readFileSync('./templates/Manager.html', 'utf8');
            managerCard = managerCard.replace('{{name}}', manager.getName());
            managerCard = managerCard.replace('{{role}}', manager.getRole());
            managerCard = managerCard.replace('{{id}}', manager.getId());
            managerCard = managerCard.replace('{{email}}', manager.getEmail());
            managerCard = managerCard.replace('{{officeNumber}}', manager.getOfficeNumber());

            
            // Initial cards only has the Manager card info.
            var cards = managerCard; 
            for (var i = 0; i < teamMembers.length; i++) {
                var employee = teamMembers[i];
                // Cards adds and then equals every new employee card info.
                cards += renderEmployee(employee);
            }

            // Adds cards to main.html and outputs to team.html.
            main = main.replace('{{cards}}', cards);

            fs.writeFileSync('./output/team.html', main);

            // Console.log that the html has been generated
            console.log("The team.html has been generated in output");
        }
    });
}

// renderEmployee function that is called above.

function renderEmployee(employee) {
    if (employee.getRole() === "Intern") {
        var internCard = fs.readFileSync('./templates/intern.html', 'utf8');
        internCard = internCard.replace('{{name}}', employee.getName());
        internCard = internCard.replace('{{role}}', employee.getRole());
        internCard = internCard.replace('{{id}}', employee.getId());
        internCard = internCard.replace('{{email}}', employee.getEmail());
        internCard = internCard.replace('{{school}}', employee.getSchool());
        return internCard;
    } else if (employee.getRole() === "Engineer") {
        var engineerCard = fs.readFileSync('./templates/engineer.html', 'utf8');
        engineerCard = engineerCard.replace('{{name}}', employee.getName());
        engineerCard = engineerCard.replace('{{role}}', employee.getRole());
        engineerCard = engineerCard.replace('{{id}}', employee.getId());
        engineerCard = engineerCard.replace('{{email}}', employee.getEmail());
        engineerCard = engineerCard.replace('{{github}}', employee.getGithub());
        return engineerCard;
    }
}

managerData();