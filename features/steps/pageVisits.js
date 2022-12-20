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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NzAzMTUwODR9.Es56s1-At5_I7MKPrfqunjIJY40f-9NmYtWhI7GcuZY"
        );
      });
      return await this.page.goto("http://localhost:3000/dashboard");

    case "books":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NzAzMTUwODR9.Es56s1-At5_I7MKPrfqunjIJY40f-9NmYtWhI7GcuZY"
        );
      });
      return await this.page.goto("http://localhost:3000/books");

    case "exchangerequest":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZjA5YTgxOGEyMTAzYTQ5ZmRhM2YiLCJpYXQiOjE2NzAzMTk2NzB9.imWi0LdAuSQFWc8B4I5NVvOAunc3GzvT4_9A8GCZi4o"
        );
      });
      return await this.page.goto(
        "http://localhost:3000/dashboard/exchangerequest"
      );

    case "ebook":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZjBkZjgxOGEyMTAzYTQ5ZmRhNDMiLCJpYXQiOjE2Njk4ODY3MjN9.gVOC1CeG_1qRKEdeOBS61B-m1b7sKOORik_EiPL1tiw"
        );
      });
      return await this.page.goto(
        "http://localhost:3000/dashboard_admin/ebook"
      );

    case "audiobook":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZjBkZjgxOGEyMTAzYTQ5ZmRhNDMiLCJpYXQiOjE2Njk4ODY3MjN9.gVOC1CeG_1qRKEdeOBS61B-m1b7sKOORik_EiPL1tiw"
        );
      });
      return await this.page.goto(
        "http://localhost:3000/dashboard_admin/audio_book"
      );

    case "homepage":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg3NThiNDBmMjMwYmQ4MWJhZmFkMDciLCJpYXQiOjE2NzA1Nzc2OTh9.XSN3QE7NAIFgz41BKaQ5EkiGT4YerXuKz0uH1E6xcoQ"
        );
      });
      return await this.page.goto("http://localhost:3000");

    case "singleaudiobookpage":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg3NThiNDBmMjMwYmQ4MWJhZmFkMDciLCJpYXQiOjE2NzA1Nzc2OTh9.XSN3QE7NAIFgz41BKaQ5EkiGT4YerXuKz0uH1E6xcoQ"
        );
      });
      return await this.page.goto(
        "http://localhost:3000/singleaudiobook/639061e6e895bc8961b0a1a6/Justin%20Bieber"
      );

    case "singleebookpage":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZjA5YTgxOGEyMTAzYTQ5ZmRhM2YiLCJpYXQiOjE2NzA1OTUyNjR9.P-Kgz8shspIGm405aD-ybSyIV7lWjkP5hrK7M3XEvRk"
        );
      });
      return await this.page.goto(
        "http://localhost:3000/ebooksinglebook/63929809c4905c6eadb63343/JK%20Rolling"
      );

    case "rentedEbooks":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NzAzMTUwODR9.Es56s1-At5_I7MKPrfqunjIJY40f-9NmYtWhI7GcuZY"
        );
      });
      return await this.page.goto("http://localhost:3000/dashboard/myebooks");
    // for conversation................x.............x...........
    case "singleebookpages":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzcyNDdlMmRiNTM4ZDhkYTdmZWFhM2IiLCJpYXQiOjE2NzA5Mjc2MDZ9.VoRitTJ_EgvstRDvtyW3AlU9CSuFxSArvKIOnuN5eBE"
        );
        localStorage.setItem("username", "Aayush");
      });
      return await this.page.goto(
        "http://localhost:3000/singlebook/63905f81e895bc8961b0a101/Collen%20Hoover"
      );

    case "messagepage":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzcyNDdlMmRiNTM4ZDhkYTdmZWFhM2IiLCJpYXQiOjE2NzA5Mjc2MDZ9.VoRitTJ_EgvstRDvtyW3AlU9CSuFxSArvKIOnuN5eBE"
        );
        localStorage.setItem("username", "Aayush");
      });
      return await this.page.goto("http://localhost:3000/dashboard/messages");

    //..........................x.......................x.......................x....................x...........................x.......x


    // add wishlist by user.......................x......................x.........................x...........x
    
    case "wishlist":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NzAzMTUwODR9.Es56s1-At5_I7MKPrfqunjIJY40f-9NmYtWhI7GcuZY"
        );
      });
      return await this.page.goto("http://localhost:3000/singlebook/63905f81e895bc8961b0a101/Collen%20Hoover");
    case "delete-wishlist":
      await this.page.evaluateOnNewDocument(() => {
        localStorage.clear();
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NzAzMTUwODR9.Es56s1-At5_I7MKPrfqunjIJY40f-9NmYtWhI7GcuZY"
        );
      });
      return await this.page.goto("http://localhost:3000/wishlist");
      
    default:
      throw new Error(`${string} is not a supported page name`);
  }
});
