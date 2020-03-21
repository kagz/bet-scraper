'use strict';

const typeorm = require('typeorm');

class Game {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const { EntitySchema } = require('typeorm');

const GameSchema = new EntitySchema({
  name: 'Game',
  target: Game,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: { type: 'varchar' },
  },
});
async function getConnection() {
  return typeorm.createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'sportsbets',
    synchronize: true,
    logging: false,
    entities: [GameSchema],
  });
}

async function getAllGames() {
  const connection = await getConnection();
  const gameRepo = connection.getRepository(Game);
  const games = await gameRepo.find();
  connection.close();
  return games;
}

async function insertGame(names) {
  const connection = await getConnection();

  // create
  const game = new Game();
  game.name = names;

  // save
  const gameRepo = connection.getRepository(Game);
  const res = await gameRepo.save(game);
  console.log('saved', res);

  // return new list
  const allGames = await gameRepo.find();
  connection.close();
  return allGames;
}

module.exports = {
  getAllGames,
  insertGame,
};
