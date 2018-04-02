'use strict';

const peoplesData = {
  Max: {
    a : [1, 3, 4],
    b : [2, 4, 5],
    delayA: 1000,
    delayB: 0
  },
  Alex: {
    a : [6, 7, 8, 9],
    b : [7, 9, 10],
    delayA: 300,
    delayB: 750
  },
  Sam: {
    a : [12, 14, 15],
    b : [11, 13, 15],
    delayA: 100,
    delayB: 400
  }
}

const getDataSetOne = (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(function(peoplesData, name){
      resolve(peoplesData[name].a);
    }, peoplesData[name].delayA, peoplesData, name);
  });
}

const getDataSetTwo = name => {
  return new Promise((resolve, reject) => {
    setTimeout(function(peoplesData, name){
      resolve(peoplesData[name].b);
    }, peoplesData[name].delayB, peoplesData, name);
  });
}

module.exports = { getDataSetOne, getDataSetTwo };