import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
