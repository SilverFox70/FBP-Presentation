'use strict';

const jsdoc2md = require('jsdoc-to-markdown');
const path = require('path');
const libPath = path.join(__dirname, '..', 'lib');
const clc = require('cli-color');
const yellow = clc.yellow;
const cyan = clc.cyan;
const mag = clc.magenta;
const blue = clc.blue;
const brBlue = clc.blueBright;
const brBlack = clc.blackBright;

/**
 * Get a list of function names for module.exports
 * from the JSDoc data 
 * @param {Object} jsonArray - A JSON array of objects, each object being parsed JSDoc from a file
 * @returns {Array<string>} - Array of all the functions which are exported from the files parsed. 
 */
const getExports = (jsonArray) => {
  let exportList = [];
  jsonArray.forEach(elem => {
    if (elem.memberof === 'module.exports') {
      exportList.push(elem.name);
    }
  });
  return exportList;
}

const isValidFunction = (exportedFunctionNames, entry) => {
  return (entry.comment !== '' && exportedFunctionNames.indexOf(entry.name) !== -1)
}

/**
 * Transforms jsdoc data obtain from jsdoc2md.getJsdocData into format
 * for use in creating NodeFunction Objects.
 * @param {Object} jsonArray - A JSON array of objects, each object being parsed JSDoc from a file
 * @returns {Object} - A JSON array of objects for use in creating NodeFunction instances.
 */
const transformJsdocJSON = (jsonArray) => {
  let exportedFunctionNames = getExports(jsonArray);
  console.log(brBlack(JSON.stringify(exportedFunctionNames, null, 2)));
  let list = [];
  jsonArray.forEach(entry => {
    
    // if (typeof entry.meta === 'undefined') {
    //   console.log(yellow(JSON.stringify(entry, null, 2)));
    // }

    if (isValidFunction(exportedFunctionNames, entry)) {
      let pathToFunction = path.join(libPath, entry.meta.filename);

      let doc = {
        fn: require(pathToFunction)[entry.name],
        fnName: entry.name,
        filename: entry.meta ? entry.meta.filename : '',
        description: entry.description,
        params : entry.params,
        returns : entry.returns,
        path: entry.meta ? entry.meta.path : '',
        doOnce: false,
        retry: {
          do: false,
          timeOutInterval: 3,
          attempts: 1
        }
      }

      console.log(yellow(`${doc.fn.name} : ${doc.fn}`));

      // if (entry.kind === 'function' && entry.name.startsWith('_')) {
      //   console.log(yellow(entry.name));
      // }

      if (doc !== {}) {
        list.push(doc);
      }
    }
  });
  
  // console.log(mag(JSON.stringify(list, null, 2)));
  return list;
}

/**
 * Uses jsdoc2md.getJsdocData to acquire JSDoc from files. The format is intended for use
 * in creating NodeFunction instances
 * @param {Object} options - Accepts an optional object. if Options.path is set this will become
 * the file or folder which has its contents parsed from JSDoc to JSON.
 * @returns {Object} - A JSON array of objects for use in creating NodeFunction instances.
 */
const parseJsdocToFunctionData = () => {
  return new Promise((resolve, reject) => {
    let pathToFolder = path.join(libPath, '*.js');
    // let pathToFolder = path.join(libPath, 'ImageProcessor.js');
    jsdoc2md.getJsdocData({files: pathToFolder}) //{source: fileDataObjects[0].fileText}
      .then(response => {
        console.log(brBlue(JSON.stringify(response, null, 2)));
        resolve(transformJsdocJSON(response));
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

module.exports = parseJsdocToFunctionData;



