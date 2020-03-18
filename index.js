'use strict';

const puppeteer = require('puppeteer');
const { wait } = require('./utils');

puppeteer.launch({ headless: false }).then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.pinnacle.com/');
  await page.waitForSelector('a[href="/en/soccer/matchups/highlights"]');
  await page.click('a[href="/en/soccer/matchups/highlights"]');
  await wait(10000);
  return browser.close();
});
