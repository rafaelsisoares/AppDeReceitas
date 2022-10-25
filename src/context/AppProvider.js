import React from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useRecipes from '../hooks/useRecipes';

function AppProvider({ children }) {
  const value = useRecipes();
  console.log(value);

  return (
    <AppContext.Provider value={ value }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default AppProvider;
