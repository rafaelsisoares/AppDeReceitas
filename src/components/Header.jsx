import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header(props) {
  const { pathname } = useLocation();

  const [isActiveSearch, toggleActiveSearch] = useState(false);

  const title = (pathname.slice(1));
  let treatTitle = `${title[0].toUpperCase()}${title.slice(1)}`;
  treatTitle = treatTitle.replace('-', ' ').split(' ');
  treatTitle = treatTitle.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
  console.log(treatTitle);

  const { haveHeaderSearchBtn } = props;
  return (
    <header>
      <h1 data-testid="page-title">{ treatTitle }</h1>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt=""
        />
      </Link>

      { haveHeaderSearchBtn && (
        <button
          type="button"
          onClick={ () => {
            toggleActiveSearch(!isActiveSearch);
          } }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search"
          />
        </button>)}

      {isActiveSearch && <SearchBar /> }

    </header>
  );
}

Header.propTypes = {
  haveHeaderSearchBtn: PropTypes.bool.isRequired,
};
