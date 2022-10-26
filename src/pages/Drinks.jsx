import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Drinks() {
  const { recipesData: { drinks } } = useContext(AppContext);

  const { pathname } = useLocation();

  const haveHeaderSearchBtn = pathname === '/profile'
  || pathname === '/done-recipes'
  || pathname === '/favorite-recipes';

  const haveHeader = !(pathname.includes(':id'));

  if (drinks.length === 1) {
    const currRecipeId = drinks[0].idDrink;
    return <Redirect to={ `/drinks/${currRecipeId}` } />;
  }

  const renderRecipesLimit = 12;

  return (
    <div>
      {haveHeader && <Header haveHeaderSearchBtn={ !haveHeaderSearchBtn } />}

      { drinks.length > 0 && drinks.map((recipe, index) => {
        if (index < renderRecipesLimit) {
          return (
            <div
              key={ recipe.idDrink }
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                className="recipe-card-img"
                data-testid={ `${index}-card-img` }
                src={ recipe.strDrinkThumb }
                alt=""
              />
              <h3
                className="recipe-title"
                data-testid={ `${index}-card-name` }
              >
                {recipe.strDrink}

              </h3>
            </div>
          );
        }
        return null;
      })}

      <Footer />
    </div>
  );
}
