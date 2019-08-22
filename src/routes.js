import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Contractor from './components/Contractor/Contractor';
import Client from './components/Client/Client';
import ProjectForm from './components/ProjectForm/ProjectForm';
import Bid from './components/Bid/Bid';

export default (
    <Switch>
        <Route component={Home} exact path='/'/>
        <Route component={Login} path='/Login'/>
        <Route component={Register} path='/Register'/>
        <Route component={Contractor} path='/Contractor'/>
        <Route component={Client} path='/Client'/>
        <Route component={ProjectForm} path='/ProjectForm'/>
        <Route component={Bid} path='/Bid/:id'/>
    </Switch>
)
