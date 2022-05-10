// This is the test for the Intern class that will run with jest.
// We only have to test the code for school and intern because those are unique traits to the class of Intern.
// The other traits were already tested with the Employee class (parent class).

// bringing in the intern file we want to test.
const Intern = require("../lib/Intern");

describe("Intern", () => {
  describe("Initialization", () => {
    it("should set school via constrcutor arguments", () => {
      // arrange
      const school = "georgiatech";
      // act
      const intern = new Intern("Alice", 1, "test@test.com", school);
      // assert
      expect(intern.school).toBe(school);
    });
  });

  describe("Getter methods", () => {
    it("should get school via getSchool()", () => {
      // arrange
      const school = "georgiatech";
      // act
      const intern = new Intern("Alice", 1, "test@test.com", school);
      const internSchool = intern.getSchool();
      // assert
      expect(internSchool).toBe(school);
    });

    it("should get role via getRole()", () => {
      // arrange
      const role = "Intern";
      // act
      const intern = new Intern("Alice", 100, "test@test.com", "georgiatech");
      const internRole = intern.getRole();
      // assert
      expect(internRole).toBe(role);
    });
  });
});