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
    case "approve_book":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTgzNDY3YTZkMGI3NWY1MjA3OTEiLCJpYXQiOjE2Njg3NzA2NTB9._c3VbC_4648zoUvOz-4PJCwnmbb-x0Ie-k8P5mrP_Pc"
        );
      });
      return await this.page.goto(
        "http://localhost:3000/dashboard_admin/admin_approve"
      );
    case "rent_book":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTgzNDY3YTZkMGI3NWY1MjA3OTEiLCJpYXQiOjE2Njg3NzA2NTB9._c3VbC_4648zoUvOz-4PJCwnmbb-x0Ie-k8P5mrP_Pc"
        );
      });
      return await this.page.goto(
        "http://localhost:3000/singlebook/637b6f152b66706df6de0d47"
      );

    // this is to locate page and get token of rent request
    case "approve_rent":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NjkyOTc2Njl9.QOPSjR_m8CM6qYynDwMK6JYJXa9d0-JGgIuIK4O98TA"
        );
      });
      return await this.page.goto("http://localhost:3000/dashboard/request");

    case "dashboard":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg3NThiNDBmMjMwYmQ4MWJhZmFkMDciLCJpYXQiOjE2Njk4MTUxNTB9.VZND1qIcHca7ms42BA1JJdJGfopUiyBf9xn16Ak3PdU"
        );
      });
      return await this.page.goto("http://localhost:3000/dashboard");
    default:
      throw new Error(`${string} is not a supported page name`);
  }
});
