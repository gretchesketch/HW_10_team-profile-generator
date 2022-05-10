// This is the test for the Engineer class that will run with jest.
// We only have to test the engineer and the github code that pertains to the class Engineer
// This is because the other code that applys to all roles has already been tested in the Employee class (parent class) test.
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;