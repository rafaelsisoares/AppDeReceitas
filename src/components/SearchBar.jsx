import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';

export default function SearchBar() {
  const INITIAL_STATE = {
    searchBy: '',
    searchValue: '',
  };

  const [searchOptions, setSearchOptions] = useState(INITIAL_STATE);

  const { pathname } = useLocation();

  const { setRecipesData } = useRecipes();

  const treatEndpoint = () => {
    const { searchBy, searchValue } = searchOptions;
    const maxLength = 50;
    let maxSearchLength = maxLength;
    if (searchBy === 'primeira-letra') { maxSearchLength = 1; }
    if (searchValue.length > maxSearchLength) {
      return global.alert('Your search must have only 1 (one) character');
    }
    let searchFilter;
    if (searchBy === 'ingrediente') { searchFilter = 'i'; }
    if (searchBy === 'nome') { searchFilter = 's'; }
    if (searchBy === 'primeira-letra') { searchFilter = 'f'; }
    const searchOpt = searchFilter === 'i' ? 'filter' : 'search';
    const hasDrink = pathname.includes('drink');
    const apiAddres = hasDrink ? 'thecocktaildb' : 'themealdb';

    return { searchOpt, searchFilter, searchValue, apiAddres };
  };

  const reqApi = async () => {
    const { searchOpt, searchFilter, searchValue, apiAddres } = treatEndpoint();
    const endpoint = `https://www.${apiAddres}.com/api/json/v1/1/${searchOpt}.php?${searchFilter}=${searchValue}`;
    const data = await (await fetch(endpoint)).json();
    console.log(endpoint);
    return setRecipesData(data);
  };

  const handleOnInputChange = ({ target: { value } }) => {
    setSearchOptions({
      ...searchOptions,
      searchBy: value,
    });
  };

  const handleInputSearch = ({ target: { value } }) => {
    setSearchOptions({
      ...searchOptions,
      searchValue: value,
    });
  };

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
        onClick={ reqApi }
        type="button"
        data-testid="exec-search-btn"
      >
        Search

      </button>
    </div>
  );
}
