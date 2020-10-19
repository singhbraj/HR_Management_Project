import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Insert from './components/insert';
import View from './components/view';

import './App.css';

 
export default () => (
  <div style={{marginTop:20,marginLeft:8,marginRight:8}}>
<Router>
  <Switch>
  <Route exact path='/' component={Login} />
  <Route exact path='/signup' component ={Signup} />
  <Route exact path='/View' component ={View} />
  <Route exact path='/insert' component ={Insert} />
  
</Switch>
  </Router>
  </div>
);