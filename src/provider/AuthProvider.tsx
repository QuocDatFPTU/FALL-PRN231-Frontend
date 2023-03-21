import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import { auth } from "service/firebase";
import { AuthContext } from "../context/AuthContext";

// import { auth } from "../firebaseSetup";

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
