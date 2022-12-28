const { When } = require("cucumber");

When("I click the {string} button", async function (string) {
  const el = await this.page.$(`[data-test="${string}"]`);
  await el.evaluate((b) => b.click());
  return el;
});

When("I click on {string} input", async function (string) {
  const el = await this.page.$(`[data-test="${string}"]`);
  await el.evaluate((b) => b.click());
  return el;
});
