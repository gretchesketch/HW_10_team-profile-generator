// required packages
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./src/page-template");
const inquirer = require("inquirer");
const fs = require("fs");

// created an object of teamMembers and gave it values of manager, engineer, and intern.
const teamMembers = {
  manager: null,
  engineers: [],
  interns: [],
};
const idArray = [];

// a function to promt the user for information.
// Prompt that will return an error if teh user does not input anything for the manager name.
function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character";
        },
      },
      // user prompted for manager's id.
      {
        type: "input",
        name: "managerId",
        message: "what is the team manager's id",
        validate: (answer) => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than 0";
        },
      },
      // user prompted for the managers email address.
      {
        type: "input",
        name: "managerEmail",
        message: "what is the team manager's email",
        validate: (answer) => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return "Please enter a valid email";
        },
      },
      //user prompted for office number
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "what is the team manager's office number",
        validate: (answer) => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than 0";
        },
      },
    ])
    // creates a dynamic card for manager, pushes the information to the team.
    // There can only be one manager object in the teamMembers object.
    .then((answers) => {
      const manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerOfficeNumber
      );
      teamMembers.manager = manager;
      idArray.push(answers.managerId);
      createTeam();
    });
}

// creating a function to propmt the user to choose with the arrow keys the role of the next employee in the team.
// if intern is chosen then the user will be prompted for the correct information pertaining to the intern.
// if engineer is chosen then the user will be prompted to answer the questions pertaining to engineer.
// if not more employees to add then move on and generate the html document with the cards for the respective employee.
function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I do not want to add any more"],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          buildTeam();
      }
    });
}

// user chose engineer
//prompt user for engineer name.
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character";
        },
      },
      // prompt user for engineer id.
      {
        type: "input",
        name: "id",
        message: "what is the id",
        validate: (answer) => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            if (idArray.includes(answer)) {
              return "This id is already taken";
            } else {
              return true;
            }
          }
          return "Please enter a positive number greater than 0";
        },
      },
      // prompt user for engineer email address
      {
        type: "input",
        name: "email",
        message: "what is the email",
        validate: (answer) => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return "Please enter a valid email";
        },
      },
      // prompt user for engineer github user name.
      {
        type: "input",
        name: "github",
        message: "what is the github",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character";
        },
      },
    ])
    // user answered all prompts and now the engineer is generated a card and pushed to the team.
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      teamMembers.engineers.push(engineer);
      idArray.push(answers.id);
      createTeam();
    });
}

// user chose intern
// prompt user for intern name.
function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character";
        },
      },
      // prompt user for intern id.
      {
        type: "input",
        name: "id",
        message: "what is the id",
        validate: (answer) => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            if (idArray.includes(answer)) {
              return "This id is already taken";
            } else {
              return true;
            }
          }
          return "Please enter a positive number greater than 0";
        },
      },
      // prompt user for intern email address.
      {
        type: "input",
        name: "email",
        message: "what is the email",
        validate: (answer) => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return "Please enter a valid email";
        },
      },
      // prompt user for intern's school.
      {
        type: "input",
        name: "school",
        message: "what is the school",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character";
        },
      },
    ])
    // user has answered all prompts for intern and a card is generated and properties for intern are pushed to team.
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      teamMembers.interns.push(intern);
      idArray.push(answers.id);
      createTeam();
    });
}

// once all prompts are complete write html document.
function buildTeam() {
  fs.writeFile("dist/team.html", render(teamMembers), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

createManager();