const { When } = require("cucumber");

When("I click the {string} button", async function (string) {
  const el = await this.page.$(`[data-test="${string}"]`);
  await el.click();
  return el;
});
