# About this folder
The items in here should be react agnostic. For now.


We have three kinds of things:

##Algorithms

A top level component call by the react application. The algorithm must have a tick() event which will return a list of objects to be painted.

##Parameters

A parameter represents just a dynamic raw value.

##SubAlgorithm

A sub algorithm contains a list of parameters and individually can return objects to either be painted, or to be used in other parts of the algorithm.
