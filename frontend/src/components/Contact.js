import React, { Component } from 'react';

import patreon from "./images/patreon.png"; 
import github from "./images/github.png"; 

 const Contact = ({}) => {
    return (<div className="contact">

    <a href = "https://www.patreon.com/geoplanets" target="_blank"><img src = {patreon} className ="patreon"/> </a> 
    <a href = "https://github.com/dwjohnston/geoart-v4" target ="_blank"><img src ={github} className ="github"/></a> 

    </div>);
  }
  
  export default Contact; 