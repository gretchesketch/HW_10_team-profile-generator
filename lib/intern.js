// This is the test for the Intern class that will run with jest.
// We only have to test the code for school and intern because those are unique traits to the class of Intern.
// The other traits were already tested with the Employee class (parent class).
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return "Intern";
  }
}

module.exports = Intern;