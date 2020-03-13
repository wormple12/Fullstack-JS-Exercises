import UserFacade from "../../src/facades/user";
const expect = require("chai").expect;

describe("Test of UserFacade", function() {
  after(async () => {
    await UserFacade.deleteUser("kim@b.dk");
  });

  describe("Verify the #getAllUsers()", function() {
    it("should return 3 users", async function() {
      expect(await (await UserFacade.getAllUsers()).length).to.equal(3);
    });
  });

  describe("Verify the #addUser()", function() {
    it("should successfully add Ole and Kim to the list of users", async function() {
      await UserFacade.addUser({
        name: "ole",
        userName: "ole@b.dk",
        password: "secret",
        role: "user"
      });
      const msg = await UserFacade.addUser({
        name: "kim",
        userName: "kim@b.dk",
        password: "secret",
        role: "user"
      });
      expect(msg).to.equal("User was added");
      expect(await (await UserFacade.getAllUsers()).length).to.equal(5);
    });
  });

  describe("Verify the #deleteUser()", function() {
    it("should successfully delete Ole from the list of users", async function() {
      const msg = await UserFacade.deleteUser("ole@b.dk");
      expect(msg).to.equal("User was deleted");
      expect(await (await UserFacade.getAllUsers()).length).to.equal(4);
    });
  });

  describe("Verify the #getUser()", function() {
    it("should username kim@b.dk return user Kim", async function() {
      const user = await UserFacade.getUser("kim@b.dk");
      expect(user.name).to.equal("kim");
      expect(user.role).to.equal("user");
    });
    it("should username ole@b.dk throw an error", async function() {
      try {
        await UserFacade.getUser("ole@b.dk");
      } catch (err) {
        expect(err.message).to.equal("User Not Found");
      }
    });
  });

  describe("Verify the #checkUser()", function() {
    it("should correct pw return true", async function() {
      const ok = await UserFacade.checkUser("kim@b.dk", "secret");
      expect(ok).to.equal(true);
    });
    it("should wrong password throw false(?)", async function() {
      try {
        await UserFacade.checkUser("pp@b.dk", "wrong password");
      } catch (err) {
        expect(err).to.equal(false);
      }
    });
  });
});
