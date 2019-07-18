import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie9';

import 'antd/dist/antd.css';
import './index.css';
// import App from './App';
import { Root } from 'popout-research/Root';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
