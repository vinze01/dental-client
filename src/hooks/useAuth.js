import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/verify', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    });
  }, []);

  return { authState, setAuthState };
};

export default useAuth;
