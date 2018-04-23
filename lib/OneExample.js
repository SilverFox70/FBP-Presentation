'use strict';

const peoplesData = require('./../data/peopleData');

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