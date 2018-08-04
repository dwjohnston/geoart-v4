import React from 'react';




const GlobalControls = ({algorithm, onEvent}) => {

    const randomize = () => {
        algorithm.randomize(); 
        onEvent(algorithm);

    }

    return ( 
        <div className ="global-controls"> 
            <button onClick = {randomize}> <i className="fas fa-random"></i> </button> 
        </div> 
    );
}; 

export default GlobalControls; 