/* eslint-disable strict */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */

const { spawn } = require("child_process");
const schedule = require("node-schedule");

schedule.scheduleJob("7 10 * * *", () => {
  console.log("STUFF RUNNIG THE SCRAPPER ");
  spawn("node", ["index.js"]);
});
