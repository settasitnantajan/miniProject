// src/contexts/AuthContext.js
import React, { useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import Swal from "sweetalert2";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  function openAuthModal() {
    setAuthModalOpen(true);
  }

  function closeAuthModal() {
    setAuthModalOpen(false);
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        Swal.fire({
          icon: "success",
          title: "Signed up successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        return userCredential;
      }
    );
  }

  function loginWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        Swal.fire({
          icon: "success",
          title: "Logged in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        return userCredential;
      }
    );
  }

  function logout() {
    return signOut(auth).then(() => {
      Swal.fire({
        icon: "info",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // เพิ่มหน่วงเวลาก่อนตั้งค่า currentUser เพื่อให้ UI อัปเดตช้าลง
      // setTimeout(() => {setCurrentUser(user); setLoading(false);}, 1000)
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    loginWithEmail,
    logout,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
