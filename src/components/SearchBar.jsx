import React from 'react';
import { useLocation } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';

export default function SearchBar() {
  const { handleInputSearch, handleOnInputChange, searchRequest } = useRecipes();

  const { pathname } = useLocation();

  return (
    <div>
      <label htmlFor="search-by">
        Ingredients
        <input
          onChange={ handleOnInputChange }
          name="search-by"
          value="ingrediente"
          id="search-by"
          type="radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="search-by">
        Name
        <input
          onChange={ handleOnInputChange }
          value="nome"
          name="search-by"
          id="search-by"
          type="radio"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="search-by">
        First Letter
        <input
          onChange={ handleOnInputChange }
          value="primeira-letra"
          name="search-by"
          id="search-by"
          type="radio"
          data-testid="first-letter-search-radio"
        />
      </label>
      <input
        onChange={ handleInputSearch }
        type="text"
        data-testid="search-input"
      />
      <button
        onClick={ () => {
          searchRequest(pathname);
        } }
        type="button"
        data-testid="exec-search-btn"
      >
        Search

      </button>
    </div>
  );
}
