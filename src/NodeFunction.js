'use strict';

const eventSystem = require('./eventDispatcher');
const events = eventSystem.eventDispatcher;
var uuidv4 = require('uuid/v4');
const clc = require('cli-color');
const red = clc.red;
const green = clc.green;
const blue = clc.blue;
const cyan = clc.cyan;
const yellow = clc.yellow;
const mag = clc.magenta;
const brblue = clc.blueBright;
const brblk = clc.blackBright;
const bold = clc.bold;

class Node {
  constructor(params) {
    this.uuid = uuidv4();
    this.isClass = params.isClass || false;
    this.children = params.children || [];
    this.fnData = params.fnData;
    this.name = params.nodeName || this.fnData.fn.name;
    this.links = params.links || {in: [], out: []};
    this.sys = this._defaultSysConstructor(params.sys);
    this.displayUI = params.displayUI || {};
    this.createdAt = new Date();
    this.updatedAt = null;
    this.processEnteredAt = null;
    this.processExitedAt = null;
    this.nodeState = {};
    this.test = params.test || null;
    events.on(`execute_${this.uuid}`, this._exec);  

  }

  _defaultSysConstructor(sysParams = {}){
    let sys = {
      ready: sysParams.ready || true,
      sysOnly: sysParams.sysOnly || false,
      readOnly: sysParams.readOnly || false,
      spawnProcess: sysParams.spawnProcess || false,
      blockOnError: sysParams.blockOnError || false,
      clusterName: sysParams.clusterName || "default",
      projectName: sysParams.projectName || "default Project",
      environment: sysParams.environment || "development"
    };
    return sys;
  }

  _notifyListeners(){
    this.links.out.forEach(node => {
      events.emit(`execute_${node.uuid}`, {context: node}, this.nodeState.outputValue);
    });
  }

  _init(args){
    // stub for future Class Instantiation 
  }

  _exec(args){
    let prs = [...arguments];
    console.log(cyan(`[Node] executing node: ${this.name}`));
    console.log(cyan(`[Node] prs: ${JSON.stringify(prs, null, 2)}, is an array: ${prs instanceof Array}`));
    console.log(`[Node] arguments: ${arguments[0]}, ${arguments[1]}\n args: ${args}`);
    this.processEnteredAt = new Date();
    this.nodeState.inputValue = arguments;
    // if (typeof this.fnData.fn.then === 'function')
    Promise.resolve(this.fnData.fn.apply(this, prs))
      .then(response => {
        this.processExitedAt = new Date();
        this.nodeState.outputValue = response;
        console.log(brblue(JSON.stringify(this, null, 2)));
        console.log(mag(`Node ${this.name} :${JSON.stringify(response, null, 2)}`));
        console.log(brblk(`Time Elapsed: ${this._getExecutionTime()}ms.`));
        this._notifyListeners();
      })
      .catch(err => {
        this.processExitedAt = new Date();
        this.nodeState.outputValue = err;
        console.log(red(`Node ${this.name} : ${err}`));
        console.log(brblk(`Time Elapsed: ${this._getExecutionTime()}ms.`));
        // event.emit(`complete_${this.uuid}`, response); ||
        // event.emit(`fail_${this.uuid}`, response);
      });
  }

  _getExecutionTime(){
    return this.processExitedAt - this.processEnteredAt;
  }

  linkOut(node){
    this.links.out.push(node);
  }
}

module.exports = Node;
