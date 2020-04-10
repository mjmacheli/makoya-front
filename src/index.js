import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';


import {BrowserRouter as Router, Route} from 'react-router-dom'

import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import Event from './Event/Event'


import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <Router>
      <Route path='/' component={Login} exact/>
      <Route path='/home' component={Login} exact/>
      <Route path='/dashboard' component={Dashboard} exact/>
      <Route path='/user' component={Event} exact/>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
