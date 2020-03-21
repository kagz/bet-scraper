'use strict';

const express = require('express');

const app = express();
const port = 3030;

const bodyParser = require('body-parser');

const db = require('./models/games');
const scrapers = require('./index');

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // disabled for security on local
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// sample fetch all games
app.get('/games', async (req, res) => {
  await scrapers.scrapeChannel();
  console.log('HERE WE HAVE CALLED SCRAPER ');
  const games = await db.getAllGames();
  res.send(games);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//  const channelData = await scrapers.scrapeChannel(req.body.channelURL)
