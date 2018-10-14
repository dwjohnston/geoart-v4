import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route } from "react-router-dom";
import { CssBaseline } from '@material-ui/core/CssBaseline';



ReactDOM.render(
    <BrowserRouter >
        <CssBaseline />

        <Route path="/:id?" component={App} />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
