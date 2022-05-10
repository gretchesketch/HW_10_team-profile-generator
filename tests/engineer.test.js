// This is the test for the Engineer class that will run with jest.
// We only have to test the engineer and the github code that pertains to the class Engineer
// This is because the other code that applys to all roles has already been tested in the Employee class (parent class) test.

// bringing in the engineer file we want to test.
const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  describe("Initialization", () => {
    it("should set github via constrcutor arguments", () => {
      // arrange
      const github = "treyeckels";
      // act
      const engineer = new Engineer("Alice", 1, "test@test.com", github);
      // assert
      expect(engineer.github).toBe(github);
    });
  });

  describe("Getter methods", () => {
    it("should get github via getGithub()", () => {
      // arrange
      const github = "treyeckels";
      // act
      const engineer = new Engineer("Alice", 1, "test@test.com", github);
      const engineerGithub = engineer.getGithub();
      // assert
      expect(engineerGithub).toBe(github);
    });

    it("should get role via getRole()", () => {
      // arrange
      const role = "Engineer";
      // act
      const engineer = new Engineer(
        "Alice",
        100,
        "test@test.com",
        "treyeckels"
      );
      const engineerRole = engineer.getRole();
      // assert
      expect(engineerRole).toBe(role);
    });
  });
});