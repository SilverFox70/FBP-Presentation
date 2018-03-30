'use strict';

const peoplesData = {
  Max: {
    a : [1, 3, 4],
    b : [2, 4, 5]
  }
}

const getDataSetOne = (name) => {
  return new Promise((resolve, reject) => {
    console.log(name);
    console.log(peoplesData);
    setTimeout(function(peoplesData, name){
      resolve(peoplesData[name].a);
    }, 1000, peoplesData, name);
  });
}

module.exports = getDataSetOne;