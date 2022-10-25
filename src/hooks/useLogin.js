import { useEffect, useState } from 'react';

const useLogin = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [validInputs, setValidInputs] = useState({
    isValidInputs: false,
  });

  const handleOnInputChange = ({ target: { name, value } }) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  useEffect(() => {
    const validate = () => {
      const minPasswordLength = 6;
      const validateEmail = /\S+@\S+\.\S+/;
      setValidInputs({
        isValidInputs: validateEmail.test(loginData.email)
            && loginData.password.length > minPasswordLength,
      });
    };
    validate();
  }, [loginData]);

  const handleLoginSubmit = () => {
    const { email } = loginData;
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    // put to local storage
  };

  return { loginData, validInputs, setLoginData, handleLoginSubmit, handleOnInputChange };
};

export default useLogin;
