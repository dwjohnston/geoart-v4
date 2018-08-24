import React, { Component } from 'react';

import patreon from "./images/patreon.png"; 
import github from "./images/github.png"; 

import {
  FacebookIcon,
  TwitterIcon,
} from 'react-share';

 const Contact = ({}) => {
    return (<div className="contact">

    <div> <a href = "https://www.patreon.com/geoplanets" target="_blank">
      <img src = {patreon} className ="patreon"/> </a> 
    </div> 
    <a href = "https://twitter.com/geoplanetsio" target = "blank"><TwitterIcon size={32} round={false} /></a> 
    <a href = "https://www.facebook.com/geoplanets.io/" target = "blank"><FacebookIcon size={32} round={false} /></a> 
    <a href = "https://github.com/dwjohnston/geoart-v4" target ="_blank"><img src ={github} className ="github"/></a> 

    </div>);
  }
  
  export default Contact; 