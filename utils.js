'use strict';

exports.wait = async function wait(ms = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};
