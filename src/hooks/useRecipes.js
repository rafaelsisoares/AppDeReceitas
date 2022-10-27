import { useState, useContext } from 'react';
import AppContext from '../context/AppContext';

const useRecipes = () => {
  console.log(useContext(AppContext));
  const { recipesData, setRecipesData } = useContext(AppContext);

  const SEARCH_INITIAL_STATE = {
    searchBy: '',
    searchValue: '',
  };

  const [searchOptions, setSearchOptions] = useState(SEARCH_INITIAL_STATE);

  const treatEndpoint = (category) => {
    const { searchBy, searchValue } = searchOptions;
    const maxLength = 50;
    let maxSearchLength = maxLength;
    if (searchBy === 'primeira-letra') { maxSearchLength = 1; }
    if (searchValue.length > maxSearchLength) {
      return global.alert('Your search must have only 1 (one) character');
    }

    let searchFilter = 's';
    if (searchBy === 'ingrediente') { searchFilter = 'i'; }
    if (searchBy === 'primeira-letra') { searchFilter = 'f'; }
    const searchOpt = searchFilter === 'i' ? 'filter' : 'search';
    const apiAddres = category.includes('drink') ? 'thecocktaildb' : 'themealdb';
    return { searchOpt, searchFilter, searchValue, apiAddres };
  };

  const searchRequest = async (category) => {
    const { searchOpt, searchFilter, searchValue, apiAddres } = treatEndpoint(category);
    const endpoint = `https://www.${apiAddres}.com/api/json/v1/1/${searchOpt}.php?${searchFilter}=${searchValue}`;
    const data = await (await fetch(endpoint)).json();
    console.log(endpoint);
    const currTarget = apiAddres === 'thecocktaildb' ? 'drinks' : 'meals';

    if (!data[currTarget]) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    setRecipesData({
      ...recipesData,
      [currTarget]: data[currTarget],
    });
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

  return {
    handleInputSearch,
    handleOnInputChange,
    searchRequest };
};

export default useRecipes;
