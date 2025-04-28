import { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null); // <-- ADD this

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoggedIn(!!user);
      setCurrentUser(user);

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setCurrentUserData(userDoc.data());
        }
      } else {
        setCurrentUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  const login = (email, password, onClose) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Successfully logged in!");
        onClose();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const register = (email, password, onClose) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          firstName: "",   // you can collect this in your registration form
          lastName: "",    // same here
          createdAt: new Date(),
          wishlist: [],
          savedProperties: [],
        });
      })
      .then(() => {
        alert("Successfully registered!");
        onClose();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const logout = () => {
    return signOut(auth).then(() => {
      alert("Logged out");
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, currentUserData, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}