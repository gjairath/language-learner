import React, { useEffect, useState } from "react";
import firebaseConfig from "../service/firebase_config.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Redirect } from "react-router-dom";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth();

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
          setCurrentUser(user);
          setLoading(false);
      } else {
            <Redirect to={{ pathname: '/login' }} />
            setLoading(false);
      }
    });  
  }, []);
  
  
  if (loading) {
      return <p></p>
  }


  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
