import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log(user);

      if (currentUser) {
        setLoading(true);
        const userInfo = {
          email: currentUser.email,
        };

        axiosPublic
          .post("/jwt", userInfo)
          .then((res) => {
            setLoading(false);
            if (res.data.token) {
              // console.log(res.data.token);
              localStorage.setItem("access_token", res.data.token);
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      } else {
        localStorage.removeItem("access_token");
      }
    });

    if (user) {
      setLoading(false);
    }

    return () => {
      return unSubscribe();
    };
  }, [user, axiosPublic]);

  const authInfo = {
    loading,
    setLoading,
    createUser,
    user,
    login,
    logout,
    updateUserProfile,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
