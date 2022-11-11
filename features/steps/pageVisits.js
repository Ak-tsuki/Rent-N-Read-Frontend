const { Then, Given } = require("cucumber");
const { myglobal } = require("../support/world");

Then("I should be on the {string} page", async function (string) {
  const el = await this.page.$(`[data-test="${string}"]`);
  return !!el;
});

Given("I am on the {string} page", async function (string) {
  switch (string) {
    case "register":
      return await this.page.goto("http://localhost:3000/register");
    case "login":
      return await this.page.goto("http://localhost:3000/login");

    default:
      throw new Error(`${string} is not a supported page name`);
  }
});
