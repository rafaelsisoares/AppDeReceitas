import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import './App.css';
import Login from './pages/Login';
import AppProvider from './context/AppProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/drinks/:id-da-receita" component={ Drinks } />
          <Route exact path="/drinks/:id-da-receita/in-progress" component={ Drinks } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/meals/:id-da-receita" component={ Meals } />
          <Route exact path="/meals/:id-da-receita/in-progress" component={ Meals } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
