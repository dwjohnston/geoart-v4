import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { CssBaseline } from '@material-ui/core/CssBaseline';

import "./index.css";

ReactDOM.render(

    <Fragment>
        <BrowserRouter >
            <Route path="/:id?" component={App} />
        </BrowserRouter>
    </Fragment>,
    document.getElementById('root')
);
registerServiceWorker();
