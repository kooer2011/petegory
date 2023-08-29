import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode'; 

const TokenExpirationChecker = ({ token, onTokenExpired }) => {
  useEffect(() => {
    if (token) {
      const tokenPayload = jwtDecode(token);
      const expirationTime = tokenPayload.exp * 1000;

      const interval = setInterval(() => {
        if (Date.now() >= expirationTime) {
          onTokenExpired();
          clearInterval(interval);
        }
      }, 1000); // Check every second

      return () => {
        clearInterval(interval);
      };
    }
  }, [token, onTokenExpired]);

  return null;
};

export default TokenExpirationChecker;