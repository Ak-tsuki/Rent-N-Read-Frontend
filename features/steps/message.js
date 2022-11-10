const { Then } = require("cucumber");

Then("I should see {string} message", async function (string) {
  const el = await this.page.$(`[id="${string}"]`);
  return !!el;
});
