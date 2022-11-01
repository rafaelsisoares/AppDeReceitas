import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useRecipesContext from './useRecipesContext';
import AppContext from '../context/AppContext';

const useRecipes = () => {
  const { recipesData, setRecipesData } = useContext(AppContext);

  const SEARCH_INITIAL_STATE = { searchBy: '', searchValue: '' };

  const { pathname } = useLocation();

  const { reqApi } = useRecipesContext();

  const [isFiltered, toggleFiltered] = useState('');
  const [checkedSteps, setCheckedSteps] = useState([]);

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
    const currTarget = apiAddres === 'thecocktaildb' ? 'drinks' : 'meals';

    if (!data[currTarget]) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    setRecipesData({
      ...recipesData,
      [currTarget]: data[currTarget],
    });
  };

  const getIngredients = (data) => {
    const chaves = Object.keys(data).filter((key) => key.includes('Ingredient'));
    const ingredientes = chaves.map((key) => data[key]).filter((e) => e);
    const chavesMedicoes = Object.keys(data).filter((key) => key.includes('Measure'));
    const medicoes = chavesMedicoes.map((key) => data[key]).filter((e) => e);

    const ingredientesComMedicoes = ingredientes.map((ingrediente, index) => ({
      ingrediente,
      medida: medicoes[index],
    }));
    return ingredientesComMedicoes;
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

  const handleFilterByCategory = async (category, value) => {
    const currTarget = category === 'thecocktaildb' ? 'drinks' : 'meals';
    const filterByCategoryURL = `https://www.${category}.com/api/json/v1/1/filter.php?c=${value}`;
    const data = await (await fetch(filterByCategoryURL)).json();
    setRecipesData({
      ...recipesData,
      [currTarget]: data[currTarget],
    });
  };

  const handleRemoveFilter = async (category) => {
    const { data } = await reqApi(category);
    const currDataTarget = category === 'themealdb' ? 'meals' : 'drinks';
    if (data) {
      toggleFiltered('');
      return setRecipesData({
        ...recipesData,
        [currDataTarget]: data[currDataTarget],
      });
    }
  };

  const handleFilter = async ({ target: { name, value } }) => {
    if (isFiltered === name) return handleRemoveFilter(value);
    handleFilterByCategory(value, name);
    toggleFiltered(name);
  };

  const handleCheckRecipeStep = (value, name) => {
    const currCategory = pathname.includes('drinks') ? 'drinks' : 'meals';
    const prevStorageValue = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setCheckedSteps([
      ...checkedSteps,
      value,
    ]);
    if (prevStorageValue[currCategory]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...prevStorageValue,
        [currCategory]: {
          ...prevStorageValue[currCategory],
          [name]: [...checkedSteps, value],
        } }));
    }
  };

  return {
    handleInputSearch,
    handleOnInputChange,
    searchRequest,
    handleFilterByCategory,
    handleFilter,
    handleRemoveFilter,
    isFiltered,
    getIngredients,
    handleCheckRecipeStep,
    checkedSteps,
    setCheckedSteps,
  };
};

export default useRecipes;
