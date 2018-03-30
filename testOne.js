'use strict';

const getDataSetOne = require('./lib/OneExample');


getDataSetOne('Max')
  .then(res => {
    console.log(`set 1: ${res}`);
  });