import { createContext, useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";

export let TokenContext = createContext();

export function TokenContextProvider({ children }) {
  let [token, setToken] = useState(null);
  const expiresInMinutes = 120; // Token expiry time in minutes
  const expiryDate = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  useEffect(() => {
    let storedToken = Cookies.get("userToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = Cookies.get("userToken");
      if (!storedToken) {
        setToken(null); // remove token if cookie expired
      }
    }, 1000 * 4); // check every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken, expiryDate }}>
      {children}
    </TokenContext.Provider>
  );
}
