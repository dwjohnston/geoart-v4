import React from 'react';
import Overlay from "./Overlay"; 

import desktopscreenshot from "./images/desktopscreenshot.png"; 
import mobilescreenshot from "./images/mobilescreenshot.png"; 

const HelpOverlay = ({}) => {


    const buttonContent = <span><i className="far fa-question-circle"></i> help</span>;
    const ref = React.createRef(); 
    const backToTop = () => {
        ref.current.ref.current.scrollIntoView();
    }; 
    return (
        <Overlay  customButtonContent = {buttonContent} ref = {ref}> 
            <article > 
            <h1 > Help </h1> 
            <h2> I don't get it. / I can't see anything </h2> 
                <p>It doesn't work especially well on iPhone unfortunately. I don't own an iPhone so I'm not able to test for it regularly. Also, it doesn't work particuarly well on tiny phones, as the controls take up a lot of space. 
                </p>      
                <p> This is what it should look like: </p> 
                <div className ="screenshots"> 
                    <div className = "image-container mobile"><img src = {mobilescreenshot} alt ="mobile screenshot"/> <figcaption>mobile screenshot</figcaption> </div> 
                    <div className = "image-container desktop"><img src = {desktopscreenshot} alt ="desktop screenshot"/><figcaption>desktop screenshot</figcaption> </div> 

                </div>        

            <h2> It looks ok, I still don't get it. </h2> 
            <ul> <li>  Each of the tabs at the bottom control various parts of the given algorithm. </li> 
            <li> You can change algorithm with the left right selectors on either side of the algorithm's name </li> 
            <li> The randomize button ('<i className="fas fa-random"></i>') it's a handy way to find fun things. </li> 
            <li> Change the global speed of it in the first tab. </li> 
            <li> You can share your image, or download it, in the 'share my creation' section </li> 
            </ul> 



            <h2> I have an idea for an algorithm </h2> 
            <p> Cool! Making the algorithms is the funnest, and to be honset, the easiest part. </p> 
            <p> A lot of the work I've been putting into this has been to make the various parts of the algorithms reusable, and make it easy to come up with new ones.</p> 

            <p> I'm happy to hear the idea - be aware that I few in my own mind that I'm itching to do - but for now there's still a lot of infrastructure work to do. </p> 
            <p> Note that my <a href ="https://www.patreon.com/geoplanets" target ="_blank">Patreon</a> has a reward tier specifically about implementing an algorithm.  </p> 
            <h2> Something is broken. </h2> 

            <p> No doubt. </p> 
            <p> Feel free to <a href ="https://github.com/dwjohnston/geoart-v4/issues" target ="_blank">raise an issue</a> on my Github. I'll appreciate the attention. 
            </p> 
                
            <h2>How long has this taken you? </h2> 
            <p> I think I'm up to about 200-300 hours. A lot of that has been <del>learning</del> fixing the bugs and bad design patterns I made while learning ReactJS (the framework this is built in). </p> 
            <h2>What library are you using for the canvas rendering? </h2> 
            <p> I created my own. <a href = "https://www.npmjs.com/package/blacksheep-react-canvas" target ="_blank">blacksheep-react-canvas</a>. Be aware that it's not stable and I haven't written any documentation for it. 
            </p> 

            <h2>So you must into sacred geometry yeah? </h2> 
            <p> 
                Actually - I think the religiosity around geometric art is nonsense.</p> 
                
                <p> One can look for mathematical defintions of beauty etc, and that's fine.</p> 
                    <p>  But I don't see mathematics as an anymore legitimate path to spiritual enlightment than any other spiritual cause.
                        </p> <p> And I'm generally a bit apprehensive or people boiling the secrets of everything down to this one simple thing. 
                 
            </p> 

            <h2>You should make this an app</h2> 
            <p> 
                That's a long way off. I'm primarily a browswer-based web developer - I don't have any skills with iOS or Android at all. If it were to be an app available in the Appstore/Playstore it'd likely just be a native wrapper around the webpage anyway. 
                </p> 



            <a href="#" className ="back-to-top" onClick = {backToTop}> back to top </a> 
            </article> 
        </Overlay> 
    ); 
}


export default HelpOverlay; 