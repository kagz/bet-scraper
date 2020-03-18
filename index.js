'use strict';

const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://example.com');

  // Do stuff here

  return browser.close();
});
