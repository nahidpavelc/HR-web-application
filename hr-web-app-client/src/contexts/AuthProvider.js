import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../Firebase/Firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  // signup user 
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password); 
  }
  // signin user 
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }
  // LogOut 
  const logOut = () => {
    return signOut(auth);
  }
  // update User 
  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  }
  // Google login 
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.log('error: ', error);
      })
    // return signInWithPopup();
  }


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      console.log('user observing');
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  },[])
  
  const authInfo = {
    createUser,
    signIn,
    updateUser,
    logOut,
    handleGoogleSignIn,
    user,
    loading,
    
  }
  
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
