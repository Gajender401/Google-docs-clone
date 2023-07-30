'use client'
import { useEffect, useState } from "react";
import { auth } from "@/components/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function useCheckAuth() {
  const [isAuthenticated, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({
    photoURL: "",
  });
  useEffect(() => {
    onAuthStateChanged(auth, (response: any) => {
      if (response) {
        setUserData(response);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);
  return { isAuthenticated, userData };
}
