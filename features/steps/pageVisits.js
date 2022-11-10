const { Then, Given } = require("cucumber");

Then("I should be on the {string} page", async function (string) {
  const el = await this.page.$(`[data-test="${string}"]`);
  return !!el;
});

Given("I am on the {string} page", function (string) {
  switch (string) {
    case "register":
      return this.page.goto("http://localhost:3000/register");

    default:
      throw new Error(`${string} is not a supported page name`);
  }
});
