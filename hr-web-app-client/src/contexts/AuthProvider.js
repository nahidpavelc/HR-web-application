import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import app from '../Firebase/Firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  

  // signup user 
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password); 
  }
  // signin user 
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }
  // LogOut 
  const logOut = () => {
    return signOut(auth);
  }
  // update User 
  const updateUser = (userInfo) => {
    return updateProfile(user, userInfo);
   }


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      console.log('user observing');
      setUser(currentUser);
    });
    return () => unSubscribe();
  },[])
  
  const authInfo = {
    createUser,
    signIn,
    updateUser,
    logOut,
    user 
  }
  
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
