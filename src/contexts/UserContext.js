import { createContext, useState, useEffect } from "react";
import { userAuthenticationObserver, createUserDocFromAuth } from "../utilities/firebase/FirbaseUtils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = userAuthenticationObserver(async (user) =>{ 
        if(user) {await createUserDocFromAuth(user);}
        setCurrentUser(user)});

    return unsubscribe;
  },[]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
