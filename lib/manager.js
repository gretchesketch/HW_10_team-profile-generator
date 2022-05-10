// This is the test for the Manager class that will run with jest.
// We only have to test the Manager and office number part of the code because it is unique to the Manager class.
// The other traits that pertain to all employees was tested in the Employee class code.
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getOffice() {
    return this.officeNumber;
  }

  getRole() {
    return "Manager";
  }
}

module.exports = Manager;