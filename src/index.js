import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Welcome from './Welcome/Welcome'

import Login from './Login/Login'

import Profile from './Profile/Profile'

import Company from './Company/Company'

import Register from './Register/Register'

import EmployeeSearch from './EmployeeSearch/EmployeeSearch'

import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <Router>
    <Switch>
        <Route path='/' component={Welcome} exact/>
        <Route path='/home' component={Login} exact/>
        <Route path='/employeesearch' component={EmployeeSearch} exact />
        <Route path='/user' component={Event} exact/>
        <Route path='/company' component={Company} exact/>
        <Route path='/profile' component={Profile} exact/>
        <Route path='/login' component={Login} exact/>
        <Route path='/register' component={Register} exact/>
      </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
