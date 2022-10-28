import React from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useRecipesContext from '../hooks/useRecipesContext';

function AppProvider({ children }) {
  const { contentValue } = useRecipesContext();

  return (
    <AppContext.Provider value={ contentValue }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default AppProvider;
