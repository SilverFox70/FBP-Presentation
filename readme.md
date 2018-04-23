# Flow Based Programming Presentation

## Overview
Materials and resources about Flow Based Programming (FBP)

## What is FBP?

_Wikipedia_ 

_In computer programming, **flow-based programming (FBP)** is a programming paradigm
that defines applications as networks of "black box" processes, which exchange data across predefined
connections by message passing, where the connections are specified externally to the processes.
These black box processes can be reconnected endlessly to form different applications without
having to be changed internally. FBP is thus naturally component-oriented._

_FBP is a particular form of dataflow programming based on bounded buffers, information packets with
defined lifetimes, named ports, and separate definition of connections._


In _classical_ FBP, the data is a first class citizen. As opposed to constructing an application around 
the notion that it is a single, sequential process which starts at one point in time and then does a set 
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




