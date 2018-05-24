import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter, Route} from "react-router-dom";

import "./components/styles/index.css";




ReactDOM.render(
    <BrowserRouter >
        <Route path="/:id?" component={App} />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
