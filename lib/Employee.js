// employee is the parent that holds properties that apply to all employee roles.
// seperate files for the employee and there unique properties.
class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
  
    getName() {
      return this.name;
    }
  
    getId() {
      return this.id;
    }
  
    getEmail() {
      return this.email;
    }
  
    getRole() {
      return "Employee";
    }
  }
  
  module.exports = Employee;