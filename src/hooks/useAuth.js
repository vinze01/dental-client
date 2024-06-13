import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, {
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
