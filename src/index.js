import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/css/index.css';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import store from './app/store'

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
