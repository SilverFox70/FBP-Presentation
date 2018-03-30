# Flow Based Programming Presentation

## Overview
Materials and resources about Flow Based Programming (FBP)

## What is FBP?

_Wikipedia_ 

In computer programming, **flow-based programming (FBP)** is a programming paradigm
that defines applications as networks of "black box" processes, which exchange data across predefined
connections by message passing, where the connections are specified _externally_ to the processes.
These black box processes can be reconnected endlessly to form different applications without
having to be changed internally. FBP is thus naturally component-oriented.

FBP is a particular form of dataflow programming based on bounded buffers, information packets with
defined lifetimes, named ports, and separate definition of connections.


In _classical_ FBP, the data is a first class citizen. As opposed to constructing an application around 
the notionthat it is a single, sequential process which starts at one point in time and then does a set 
sequence of things until it is "finished", FBP is a network of asynchronous processes that communicate 
by passing data streams or information packets around. 


J Paul Morrison, a long time employee of IBM, is credited with being the _discoverer_ of the flow-base 
programming paradigm and has been advocating for and promoting this idea for some 40 years now. He and 
other advocates make a distinction between _classical FBP_ and FBP inspired or influenced paradigms 
such as NoFlo or Node-RED. 

## Origins of FBP

The notion of data as being an object that has a definite lifetime, and that must be cared for as a first 
class object, comes from the days of old Unit Record Machines, or punchcard machines. Morrison speaks of
being unnerved at the side effects of Van Neumann architecture, where data could simply "disappear", or be
taken care of by some unseen, underlying garbage collection mechanism. 

Let's imagine we have document. In comes to our inbox and from there it gets a signature and is placed in
a certain cubby. Documents in that cubby are consequently removed in sequential order, given a stamp, and
placed in an outbox. This is not unlike the process of moving data through a Unit Record machine. But let's 
consider the following example:

```javascript
var dataArray = [];

const setArrayValues = arr => {
  dataArray = arr;
}

const transformArray = _ => {
  return dataArray.map(e => e + 1);
}

const getArrayValues = _ => {
  return dataArray;
}

// input
let dataSetOne = [1, 2, 3];

// application

const doProcess = (data) => {
  setArrayValues(dataSetOne);
  transformArray()
  let newData = getArrayValues(); // [1, 2, 3]
  
}

// run it
doProcess(dataSetOne);

// starting the application again...
doProcess([]);

```

The "application" above is trivial, but that is not our focus. This application is not particularly concerned
with the data input at all. We give it our data, it does its thing, but we never definitively _do_ anything with 
that data. The point is not so much just that nothing is return or logged out, but also that the data sent to 
_doProcess_ can simply vanish if we call doProcess again. There is no definite lifetime for that data. 

The point is this contrived example is that, unlike a punchcard or physical document where you have to _do something_
with the object, not all applications make a guarantee about the lifecycle of the data sent in. If you can understand
why this bothered Morrison so much, it helps to explain _classical_ FBP and why similar looking systems can be
quite different from what he is currently proposing. 

