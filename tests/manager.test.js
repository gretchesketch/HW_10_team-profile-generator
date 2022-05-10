// This is the test for the Manager class that will run with jest.
// We only have to test the Manager and office number part of the code because it is unique to the Manager class.
// The other traits that pertain to all employees was tested in the Employee class (parent class) code.

// bringing in the manager file we want to test.
const Manager = require("../lib/Manager");

describe("Manager", () => {
  describe("Initialization", () => {
    it("should set office Number via constrcutor arguments", () => {
      // arrange
      const officeNumber = 100;
      // act
      const manager = new Manager("Alice", 1, "test@test.com", officeNumber);
      // assert
      expect(manager.officeNumber).toBe(officeNumber);
    });
  });

  describe("Getter methods", () => {
    it("should get office number via getOffice()", () => {
      // arrange
      const officeNumber = 100;
      // act
      const manager = new Manager("Alice", 1, "test@test.com", officeNumber);
      const managerOfficeNumber = manager.getOffice();
      // assert
      expect(managerOfficeNumber).toBe(officeNumber);
    });

    it("should get role via getRole()", () => {
      // arrange
      const role = "Manager";
      // act
      const manager = new Manager("Alice", 100, "test@test.com", 100);
      const managerRole = manager.getRole();
      // assert
      expect(managerRole).toBe(role);
    });
  });
});