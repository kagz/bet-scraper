/* eslint-disable no-sequences */

'use strict';

const { writeFileSync } = require('fs');
const puppeteer = require('puppeteer');
const { wait } = require('./utils/utils');
const db = require('./models/games');
const Email = require('./utils/email');

async function scrapeChannel() {
  puppeteer.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://www.pinnacle.com/');

    // Click on soccer highlights link
    const highlightsHrefSelector = 'a[href="/en/soccer/matchups/highlights"]';
    await page.waitForSelector(highlightsHrefSelector);
    await page.click(highlightsHrefSelector);

    // Grab data from highlights table
    await page.waitForSelector('[data-test-id="Highlights-Container"]');
    const names = await page.$$eval('[data-test-id="Highlights-Container"] .style_participantName__30PPU')
      .then(elements => elements.map(a => a.evaluate(el => el.innerText)));
    console.log('HERE WE HAVE', names);

    writeFileSync('./data/odds.json', JSON.stringify(this.names));
    // return this.names;

    // saving the result into db
    await db.insertCreator(names);

    // TODO send email from here for all the fetched names
    // this just a sample trial mail
    // eslint-disable-next-line no-unused-expressions
    await Email.send(
      JSON.stringify(names),
    ),

    await wait(10000);
    return browser.close();
  });
}
module.exports = {
  scrapeChannel,
};
