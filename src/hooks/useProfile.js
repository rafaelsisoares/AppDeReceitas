import { useEffect, useState } from 'react';

export default function useProfile() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const getUser = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      setEmail(user.email);
    };
    getUser();
  }, []);

  const handleClickLogout = () => localStorage.clear();

  return {
    email,
    handleClickLogout,
  };
}
