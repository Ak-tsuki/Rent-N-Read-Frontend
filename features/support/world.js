const { Before, After } = require("cucumber");
const puppeteer = require("puppeteer");
var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);

Before(async function () {
  const world = this;
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });
  const page = await browser.newPage();
  world._browser = browser;
  world.page = page;
});

Before({ tags: "@mobile" }, async function () {
  const world = this;
  world.page.setViewport({
    width: 320,
    height: 466,
  });
});

Before({ tags: "@tablet" }, async function () {
  const world = this;
  world.page.setViewport({
    width: 760,
    height: 622,
  });
});

After(function () {
  return this._browser.close();
});
