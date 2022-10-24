import React from 'react';

export default function Login() {
  return (
    <form action="" className="login-form">
      <label htmlFor="email">
        Email:
        {' '}
        <input
          type="email"
          name="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="email">
        Senha:
        {' '}
        <input
          type="password"
          name="password"
          data-testid="password-input"
        />
      </label>

      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}
