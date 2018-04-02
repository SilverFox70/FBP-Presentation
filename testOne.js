'use strict';

const exampleFunctions = require('./lib/OneExample');
const getDataSetOne = exampleFunctions.getDataSetOne;
const getDataSetTwo = exampleFunctions.getDataSetTwo;

let names = ['Max', 'Alex', 'Sam'];

const processPerson = name => {
  getDataSetOne(name)
    .then(responseOne => {
      console.log(`${name} set 1: ${responseOne}`);
      var a = new Set(responseOne);
      getDataSetTwo(name)
        .then(responseTwo => {
          console.log(`${name} set 2: ${responseTwo}`);
          var b = new Set(responseTwo);
          let unionSet = new Set([...a, ...b]);
          let unionArray = [...unionSet];
          console.log(`${name} union: ${unionArray}`);
        });
    });
}

names.forEach(name => {
  processPerson(name);
});