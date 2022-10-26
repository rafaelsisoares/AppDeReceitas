import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export default function Login() {
  const [redirect, setRedirect] = useState('');

  const {
    handleLoginSubmit,
    handleOnInputChange,
    validInputs } = useLogin();

  const { isValidInputs } = validInputs;

  if (redirect !== '') return <Redirect to={ redirect } />;

  return (
    <form action="" className="login-form">
      <label htmlFor="email">
        Email:
        {' '}
        <input
          type="email"
          name="email"
          data-testid="email-input"
          onChange={ handleOnInputChange }
        />
      </label>
      <label htmlFor="email">
        Senha:
        {' '}
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ handleOnInputChange }
        />
      </label>

      <button
        disabled={ !isValidInputs }
        type="button"
        data-testid="login-submit-btn"
        onClick={ () => {
          handleLoginSubmit();
          setRedirect('/meals');
        } }
      >
        Enter
      </button>
    </form>
  );
}
