'use strict';

const parseJsdocToFunctionData = require('./jsdocToFunctionData');
const eventSystem = require('./eventDispatcher');
const events = eventSystem.eventDispatcher;
const Node = require('./NodeFunction');
const path = require('path');
// const wss = require('./WebSocketServer');

const clc = require('cli-color');
const yellow = clc.yellow;
const cyan = clc.cyan;
const mag = clc.magenta;
const blue = clc.blue;
const brBlue = clc.blueBright;
const brBlack = clc.blackBright;
const red = clc.red;

var nodeList = {};

parseJsdocToFunctionData()
  .then(functionData => {
  // console.log(blue(JSON.stringify(functionData, null, 2)));
  // console.log(mag(JSON.stringify(functionData[0].fn.name, null, 2)));
  // parsedDocs[0].fn(libPath);

  // Create FunctionNodes
  functionData.forEach(fnct => {
    let params = {};
    params.fnData = fnct;
    let node = new Node(params);
    nodeList[node.name] = node;
    console.log(red(node.name));
  });

  // for testing/dev purposes
  nodeList.getFileNamesInDirectory.linkOut(nodeList.readFiles);
  let dirpath = path.join(__dirname, '..', 'lib');
  events.emit(`execute_${nodeList.getFileNamesInDirectory.uuid}`, {context: nodeList.getFileNamesInDirectory},dirpath);

  })
  .catch(err => {
    console.log(err);
  });

const getNodeList = _ => {
  return JSON.stringify(nodeList.getFileNamesInDirectory, null, 2);
}

module.exports = {getNodeList};
