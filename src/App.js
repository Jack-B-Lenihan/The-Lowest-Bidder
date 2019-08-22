import React from 'react';
import Axios from 'axios'
import logo from './logo.svg';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import routes from './routes';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    < HashRouter >
      <div>
        {routes}
      </div>
    </HashRouter>
  );
}

export default App;
