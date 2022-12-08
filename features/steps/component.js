const { Then } = require("cucumber");

Then("I should see {string} component", async function (string) {
  const el = await this.page.$(`[data-test="${string}"]`);
  return !!el;
});
