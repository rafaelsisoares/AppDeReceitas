import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Meals from './pages/Meals';
import './App.css';
import Login from './pages/Login';
import AppProvider from './context/AppProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        {/* //header */}
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
