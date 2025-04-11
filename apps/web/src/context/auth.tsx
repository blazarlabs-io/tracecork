"use client";

import { auth } from "@/lib/firebase/client";
import { User, onAuthStateChanged, signOut } from "firebase/auth";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";
import { AUTH_COOKIE } from "../utils/cookieConstants";
import { deleteCookie, setCookie } from "cookies-next";

export interface AuthContextInterface {
  user: User | null;
  setUserHandler: (user: User) => Promise<void>;
  singOutUserHandler: () => Promise<void>;
}

const contextInitialData: AuthContextInterface = {
  user: null,
  setUserHandler: async () => {},
  singOutUserHandler: async () => {},
};

const AuthContext = createContext(contextInitialData);

export const useAuth = (): AuthContextInterface => {
  const context = useContext<AuthContextInterface>(AuthContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

export const AuthProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  const setUserHandler = async (user: User) => {
    setUser(user);
    const idToken = await user.getIdToken(true);
    setCookie(AUTH_COOKIE, idToken, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  };

  const singOutUserHandler = async () => {
    setUser(null);
    signOut(auth);
    await deleteCookie(AUTH_COOKIE);
  };

  /* This effect only set the user data if it is exist */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log("Auth User", user);
      if (!user) return;
      await setUserHandler(user);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const value = { user, setUserHandler, singOutUserHandler };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
