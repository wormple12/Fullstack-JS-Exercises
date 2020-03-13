import { expect } from "chai";
import { Server } from "http";
import fetch from "node-fetch";
import { makeOptions } from "../../src/utils/fetch-utils";
const debug = require("debug")("game-project");

let server: Server;
const TEST_PORT = "7777";

describe("Test of UserAPI", () => {
  let URL: string;

  before(done => {
    // When we include a database, make sure that we use the test database

    //Switch to the test port for the API-server
    process.env["PORT"] = TEST_PORT;
    server = require("../../src/app").server;
    URL = `http://localhost:${process.env.PORT}/api/users`;
    done();
  });

  after(done => {
    server.close(done);
  });

  describe("Verify the GET path /", function() {
    it("should return 3 users", async function() {
      const users = await fetch(`${URL}/`).then(r => r.json());
      expect(users.length).to.equal(3);
    });
  });

  describe("Verify the POST path /", function() {
    it("should successfully add Ole and Kim to the list of users", async function() {
      await fetch(
        `${URL}/`,
        makeOptions("POST", {
          name: "ole",
          userName: "ole@b.dk",
          password: "secret",
          role: "user"
        })
      );

      const msg = await fetch(
        `${URL}/`,
        makeOptions("POST", {
          name: "kim",
          userName: "kim@b.dk",
          password: "secret",
          role: "user"
        })
      ).then(r => r.json());
      expect(msg.status).to.equal("User was added");

      const users = await fetch(`${URL}/`).then(r => r.json());
      expect(users.length).to.equal(5);
    });
  });

  describe("Verify the DELETE path /:userName", function() {
    it("should successfully delete Ole from the list of users", async function() {
      const msg = await fetch(
        `${URL}/ole@b.dk`,
        makeOptions("DELETE")
      ).then(r => r.json());
      expect(msg.status).to.equal("User was deleted");

      const users = await fetch(`${URL}/`, makeOptions("GET")).then(r =>
        r.json()
      );
      expect(users.length).to.equal(4);
    });
  });

  describe("Verify the GET path /:userName", function() {
    it("should username kim@b.dk return user Kim", async function() {
      const user = await fetch(`${URL}/kim@b.dk`, makeOptions("GET")).then(r =>
        r.json()
      );
      expect(user.name).to.equal("kim");
      expect(user.role).to.be.undefined;
      expect(user.password).to.be.undefined;
    });
    it("should username ole@b.dk throw an error", async function() {
      try {
        await fetch(`${URL}/ole@b.dk`, makeOptions("GET")).then(r => r.json());
      } catch (err) {
        expect(err.message).to.equal("User Not Found");
      }
    });
  });
});
