import React from 'react';
import './App.css';
import Login from './pages/Login';
import AppProvider from './context/AppProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AppProvider>
      <Login />
    </AppProvider>
  );
}

export default App;
